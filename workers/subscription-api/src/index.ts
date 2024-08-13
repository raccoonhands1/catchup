import { Hono } from 'hono';
import * as jose from 'jose';
import {
	Queue,
	KVNamespace,
	QueueContentType,
} from '@cloudflare/workers-types';
import { XMLParser } from 'fast-xml-parser';
import { drizzle } from 'drizzle-orm/d1';
import {
	papers,
	topics,
	paperTopics,
	Paper,
	NewPaper,
	Topic,
} from './db/schema';
import { eq, desc } from 'drizzle-orm';
interface Env {
	QUEUE: Queue;
	DB: D1Database;
	KV: KVNamespace;
	// env's
	APP_SECRET: string;
	JWT_ISSUER: string;
	CLERK_PUBLIC_KEY: string;
}
interface Article {
	id: number;
	arxivId: string;
	title: string;
	summary: string;
	pdf: string;
	authors: string;
	published: string;
}

const app = new Hono<{
	Bindings: Env;
	Variables: {
		userId: string;
	};
}>();

const jwtMiddleware = async (c: any, next: () => Promise<void>) => {
	const authHeader = c.req.header('Authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return c.json({ error: 'Missing or invalid Authorization header' }, 401);
	}

	const token = authHeader.split(' ')[1];

	try {
		const rawPublicKey = c.env.CLERK_PUBLIC_KEY;
		if (!rawPublicKey) {
			console.error('CLERK_PUBLIC_KEY is not set in the environment');
			return c.json({ error: 'Server configuration error' }, 500);
		}

		const formattedPublicKey = `-----BEGIN PUBLIC KEY-----\n${rawPublicKey
			.match(/.{1,64}/g)
			.join('\n')}\n-----END PUBLIC KEY-----`;
		const publicKey = await jose.importSPKI(formattedPublicKey, 'RS256');
		const { payload } = await jose.jwtVerify(token, publicKey, {
			issuer: c.env.JWT_ISSUER,
		});

		if (typeof payload.sub !== 'string') {
			throw new Error('Invalid sub claim');
		}

		c.set('userId', payload.sub);
	} catch (error) {
		console.error('Token verification failed:', error);
		return c.json({ error: 'Invalid token' }, 401);
	}

	await next();
};

//const authMiddleware = async (c: any, next: () => Promise<void>) => {
//	const authHeader = c.req.header('Authorization');
//	if (!authHeader || authHeader !== `Bearer ${c.env.APP_SECRET}`) {
//		return c.json({ error: 'Unauthorized' }, 401);
//	}
//	await next();
//};

//app.use(authMiddleware);
app.use(jwtMiddleware);

async function fetchArxivData(topic: string): Promise<Paper[]> {
	const currentDate = new Date();
	const sevenDaysAgo = new Date(
		currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
	);

	let start = 0;
	const maxResults = 100;
	let allArticles: Paper[] = [];
	let reachedOldArticles = false;

	while (!reachedOldArticles) {
		const url = `http://export.arxiv.org/api/query?search_query=all:${topic}&start=${start}&max_results=${maxResults}&sortBy=lastUpdatedDate&sortOrder=descending`;

		const response = await fetch(url);
		const xmlText = await response.text();

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
		});
		const result = parser.parse(xmlText);

		const entries = result.feed.entry;

		if (!entries) {
			console.log('No more entries found');
			break;
		}

		const entriesArray = Array.isArray(entries) ? entries : [entries];

		const articles = entriesArray.map((entry: any) => {
			const pdfLink = Array.isArray(entry.link)
				? entry.link.find((link: any) => link['@_title'] === 'pdf')?.['@_href']
				: entry.link['@_href'];

			const arxivId = entry.id.split('/abs/')[1];
			return {
				arxivId,
				title: entry.title,
				pdf: pdfLink,
				authors: (Array.isArray(entry.author)
					? entry.author.map((author: any) => author.name)
					: [entry.author.name]
				).join(','),
				published: new Date(entry.published).toISOString(),
				summary: entry.summary,
			};
		});

		// Filter articles published within the last 7 days
		const recentArticles = articles
			.filter(article => new Date(article.published) >= sevenDaysAgo)
			.map((article, index) => ({
				id: index + 1, // or use a more appropriate id generation method
				arxivId: article.arxivId,
				title: article.title,
				summary: article.summary,
				pdf: article.pdf,
				authors: article.authors,
				published: article.published,
			}));

		allArticles.push(...recentArticles);

		// Check if we've reached articles older than 7 days
		if (new Date(articles[articles.length - 1].published) < sevenDaysAgo) {
			reachedOldArticles = true;
		} else {
			start += maxResults;
		}
	}

	return allArticles;
}

app.get('/', c => {
	return c.json({ status: 'ok' });
});

app.post('/subscribe', async c => {
	let topic: string;

	try {
		const body = await c.req.json();
		if (typeof body === 'object' && body !== null && 'topic' in body) {
			topic = body.topic;
		} else {
			throw new Error('Invalid request body structure');
		}
	} catch (error) {
		return c.json(
			{ error: 'Invalid JSON in request body or missing body' },
			400
		);
	}
	if (!topic) {
		return c.json({ error: 'Missing topic in request body' }, 400);
	}

	try {
		const articles = await fetchArxivData(topic);
		const db = drizzle(c.env.DB);

		// Insert or get the topic
		let dbTopic: Topic;
		try {
			const result = await db
				.insert(topics)
				.values({ name: topic })
				.returning()
				.get();
			dbTopic = result;
		} catch (error) {
			// If topic already exists, fetch it
			if (
				error instanceof Error &&
				error.message.includes('UNIQUE constraint failed')
			) {
				const existingTopic = await db
					.select()
					.from(topics)
					.where(eq(topics.name, topic))
					.get();
				if (!existingTopic) {
					throw new Error(
						`Topic ${topic} not found after unique constraint error`
					);
				}
				dbTopic = existingTopic;
			} else {
				throw error;
			}
		}
		let insertedCount = 0;
		let skippedCount = 0;
		let errorCount = 0;

		// Reduce batch size to avoid hitting SQLite variable limit
		const batchSize = 20;

		for (let i = 0; i < articles.length; i += batchSize) {
			const batch = articles.slice(i, i + batchSize);

			try {
				// Insert papers one by one to avoid the variable limit
				for (const article of batch) {
					try {
						let paperId: number;

						// Try to insert the paper
						const insertedPaper = await db
							.insert(papers)
							.values({
								arxivId: article.arxivId,
								title: article.title,
								summary: article.summary,
								pdf: article.pdf,
								authors: article.authors,
								published: article.published,
							} as NewPaper)
							.onConflictDoNothing()
							.returning()
							.get();

						if (insertedPaper) {
							// New paper was inserted
							paperId = insertedPaper.id;
							insertedCount++;
						} else {
							// Paper already exists, fetch its ID
							const existingPaper = await db
								.select({ id: papers.id })
								.from(papers)
								.where(eq(papers.arxivId, article.arxivId))
								.get();

							if (!existingPaper) {
								throw new Error(
									`Paper with arxivId ${article.arxivId} not found after conflict`
								);
							}
							paperId = existingPaper.id;
							skippedCount++;
						}

						// Create the many-to-many relationship if it doesn't exist
						const result = await db
							.insert(paperTopics)
							.values({
								paperId: paperId,
								topicId: dbTopic.id,
							})
							.onConflictDoNothing()
							.run();

						if (!result.success) {
							console.log(
								`M2M relationship already exists for paper ${paperId} and topic ${dbTopic.id}`
							);
						} else {
							console.log(
								`Created M2M relationship for paper ${paperId} and topic ${dbTopic.id}`
							);
						}
					} catch (error) {
						console.error(
							`Error processing paper: ${(error as Error).message}`
						);
						errorCount++;
					}
				}
			} catch (error) {
				console.error(`Error processing batch: ${(error as Error).message}`);
				errorCount += batch.length;
			}
		}

		console.log(
			`Inserted: ${insertedCount}, Skipped: ${skippedCount}, Errors: ${errorCount}`
		);

		return c.json({
			success: true,
			totalCount: articles.length,
			insertedCount,
			skippedCount,
			errorCount,
			topic: dbTopic.name,
		});
	} catch (error) {
		console.error((error as Error).message);
		return c.json(
			{ error: 'An error occurred while processing the request' },
			500
		);
	}
});

app.get('/articles/:topic', async c => {
	const topic = c.req.param('topic');

	if (!topic) {
		return c.json({ error: 'Missing topic parameter' }, 400);
	}

	const cacheKey = `articles:${topic}`;
	const kv = c.env.KV;

	try {
		// Try to get the cached response
		const cachedResponse = await kv.get(cacheKey);
		if (cachedResponse) {
			return c.json(JSON.parse(cachedResponse));
		}

		const db = drizzle(c.env.DB);

		// First, find the topic
		const dbTopic = await db
			.select()
			.from(topics)
			.where(eq(topics.name, topic))
			.get();

		if (!dbTopic) {
			return c.json({ error: 'Topic not found' }, 404);
		}

		// Then, find all papers associated with this topic
		const articlesWithTopic = await db
			.select({
				id: papers.id,
				arxivId: papers.arxivId,
				title: papers.title,
				summary: papers.summary,
				pdf: papers.pdf,
				authors: papers.authors,
				published: papers.published,
			})
			.from(papers)
			.innerJoin(paperTopics, eq(papers.id, paperTopics.paperId))
			.where(eq(paperTopics.topicId, dbTopic.id))
			.orderBy(desc(papers.published))
			.all();

		const response = {
			topic: dbTopic.name,
			count: articlesWithTopic.length,
			articles: articlesWithTopic,
		};

		// Cache the response for one day
		await kv.put(cacheKey, JSON.stringify(response), { expirationTtl: 86400 });

		return c.json(response);
	} catch (error) {
		console.error((error as Error).message);
		return c.json({ error: 'An error occurred while fetching articles' }, 500);
	}
});

app.get('/topics', async c => {
	try {
		const db = drizzle(c.env.DB);

		// Fetch all topics from the database
		const allTopics = await db
			.select({
				id: topics.id,
				name: topics.name,
			})
			.from(topics)
			.all();

		return c.json({
			success: true,
			count: allTopics.length,
			topics: allTopics,
		});
	} catch (error) {
		console.error((error as Error).message);
		return c.json({ error: 'An error occurred while fetching topics' }, 500);
	}
});

app.get('/user', async c => {
	const userId = c.get('userId');
	return c.json({ userId });
});

export default app;
