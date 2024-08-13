import { Hono } from 'hono';
import * as jose from 'jose';
import { Queue, KVNamespace } from '@cloudflare/workers-types';
import { XMLParser } from 'fast-xml-parser';
import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';

import {
	papers,
	topics,
	paperTopics,
	Paper,
	NewPaper,
	users,
	User,
	userTopicSubscriptions,
	hackerNewsArticles,
	NewHackerNewsArticle,
} from './db/schema';
import { eq, desc, and, gte } from 'drizzle-orm';
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

const userRouter = new Hono<{
	Bindings: Env;
	Variables: {
		user: User;
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

		const userId = payload.sub;

		// Check if user exists
		const db = drizzle(c.env.DB);
		let user = await db
			.select()
			.from(users)
			.where(eq(users.userId, userId))
			.get();

		if (!user) {
			// Create new user if not exists
			user = await db
				.insert(users)
				.values({
					userId: userId,
					// You can set default values for researchField and bio here if needed
					// researchField: '',
					// bio: '',
				})
				.returning()
				.get();
		}

		// Add the user object to the context
		c.set('user', user);
	} catch (error) {
		console.error('Token verification failed:', error);
		return c.json({ error: 'Invalid token' }, 401);
	}

	await next();
};

userRouter.use('*', jwtMiddleware);

const superUserAuthMiddleware = async (c: any, next: () => Promise<void>) => {
	const authHeader = c.req.header('Authorization');
	if (!authHeader || authHeader !== `Bearer ${c.env.APP_SECRET}`) {
		return c.json({ error: 'Unauthorized' }, 401);
	}
	await next();
};

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

userRouter.get('/', c => {
	return c.json({ status: 'ok' });
});

userRouter.post('/subscribe', async c => {
	const { topic, user } = await validateAndExtractInput(c);
	const db = drizzle(c.env.DB);

	try {
		const dbTopic = await getOrCreateTopic(db, topic);
		const subscriptionStatus = await subscribeUserToTopic(
			db,
			user.id,
			dbTopic.id
		);
		const articles = await fetchArxivData(topic);

		const { insertedCount, skippedCount, errorCount } = await processArticles(
			db,
			articles,
			dbTopic.id,
			c.env
		);

		return c.json({
			success: true,
			subscriptionStatus,
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

async function validateAndExtractInput(c: any) {
	let topic: string;

	try {
		const body = await c.req.json();
		if (typeof body === 'object' && body !== null && 'topic' in body) {
			topic = body.topic;
		} else {
			throw new Error('Invalid request body structure');
		}
	} catch (error) {
		throw new Error('Invalid JSON in request body or missing body');
	}

	if (!topic) {
		throw new Error('Missing topic in request body');
	}

	const user = c.get('user');
	return { topic, user };
}

async function getOrCreateTopic(db: any, topicName: string) {
	try {
		const result = await db
			.insert(topics)
			.values({ name: topicName })
			.returning()
			.get();
		return result;
	} catch (error) {
		if (
			error instanceof Error &&
			error.message.includes('UNIQUE constraint failed')
		) {
			const existingTopic = await db
				.select()
				.from(topics)
				.where(eq(topics.name, topicName))
				.get();
			if (!existingTopic) {
				throw new Error(
					`Topic ${topicName} not found after unique constraint error`
				);
			}
			return existingTopic;
		} else {
			throw error;
		}
	}
}

async function subscribeUserToTopic(db: any, userId: string, topicId: number) {
	try {
		const userSubscriptionResult = await db
			.insert(userTopicSubscriptions)
			.values({
				userId: userId,
				topicId: topicId,
			})
			.onConflictDoNothing()
			.returning()
			.get();

		return userSubscriptionResult
			? 'Subscribed successfully'
			: 'Already subscribed';
	} catch (error) {
		console.error('Error in subscription process:', error);
		throw error;
	}
}
async function processArticles(
	db: DrizzleD1Database,
	articles: any[],
	topicId: number,
	env: Env
) {
	const results = await Promise.all(
		articles.map(article =>
			processArticle(db, article, topicId, env).catch(error => {
				console.error('Error processing article:', error);
				return { error: true };
			})
		)
	);

	const counts = results.reduce(
		(acc, result) => {
			if ('inserted' in result && result.inserted) acc.insertedCount++;
			if ('skipped' in result && result.skipped) acc.skippedCount++;
			if ('error' in result && result.error) acc.errorCount++;
			return acc;
		},
		{ insertedCount: 0, skippedCount: 0, errorCount: 0 }
	);

	return counts;
}

async function processArticle(
	db: DrizzleD1Database,
	article: Article,
	topicId: number,
	env: Env
): Promise<{ inserted?: boolean; skipped?: boolean; error?: boolean }> {
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
			paperId = insertedPaper.id;
			await sendToQueue(env, insertedPaper);

			// Create the many-to-many relationship
			await db
				.insert(paperTopics)
				.values({
					paperId: paperId,
					topicId: topicId,
				})
				.onConflictDoNothing()
				.run();

			return { inserted: true };
		} else {
			const existingPaper = await db
				.select()
				.from(papers)
				.where(eq(papers.arxivId, article.arxivId))
				.get();

			if (!existingPaper) {
				throw new Error(
					`Paper with arxivId ${article.arxivId} not found after conflict`
				);
			}
			paperId = existingPaper.id;
			await sendToQueue(env, existingPaper);

			// Check if the many-to-many relationship exists, if not create it
			const existingRelation = await db
				.select()
				.from(paperTopics)
				.where(
					and(
						eq(paperTopics.paperId, paperId),
						eq(paperTopics.topicId, topicId)
					)
				)
				.get();

			if (!existingRelation) {
				await db
					.insert(paperTopics)
					.values({
						paperId: paperId,
						topicId: topicId,
					})
					.run();
			}

			return { skipped: true };
		}
	} catch (error) {
		console.error(`Error processing paper: ${(error as Error).message}`);
		return { error: true };
	}
}

async function sendToQueue(env: Env, paper: Paper) {
	const processedKey = `processed:arxiv:${paper.arxivId}`;
	if (!(await env.KV.get(processedKey))) {
		const paperInsertedMessage = {
			type: 'paper.inserted',
			id: paper.id,
			arxivId: paper.arxivId,
			title: paper.title,
			summary: paper.summary,
			pdf: paper.pdf,
			authors: paper.authors,
			published: paper.published,
		};
		await env.QUEUE.send(JSON.stringify(paperInsertedMessage));
	}
}

interface CustomVector {
	values: number[];
}
function createDefaultVector(): number[] {
	return new Array(768).fill(0);
}

userRouter.get('/articles/:topic', async c => {
	const topic = c.req.param('topic');
	const user = c.get('user') as User;

	if (!topic) {
		return c.json({ error: 'Missing topic parameter' }, 400);
	}

	const cacheKey = `articles:${user.userId}:${topic}`;
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

		const sevenDaysAgo = new Date();
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
		const sevenDaysAgoString = sevenDaysAgo.toISOString().split('T')[0];

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
			.where(
				and(
					eq(paperTopics.topicId, dbTopic.id),
					gte(papers.published, sevenDaysAgoString)
				)
			)
			.orderBy(desc(papers.published))
			.all();

		// Get user vector
		let userVector: CustomVector;
		const userVectorString = await kv.get(`user-vector-${user.userId}`);
		if (!userVectorString) {
			userVector = { values: createDefaultVector() };
		} else {
			userVector = JSON.parse(userVectorString) as CustomVector;
		}

		// Get article vectors and calculate similarities
		const articlesWithSimilarity = await Promise.all(
			articlesWithTopic.map(async article => {
				const articleVectorString = await kv.get(
					`processed:arxiv:${article.arxivId}`
				);

				if (!articleVectorString) {
					console.warn(`Vector not found for article ${article.arxivId}`);
					return { ...article, similarity: 0, severity: 'low' };
				}
				const articleVector = JSON.parse(
					articleVectorString
				) as VectorizeVector;

				// Calculate dot product
				const dotProduct = (userVector.values as number[]).reduce(
					(sum: number, val: number, i: number) =>
						sum + val * articleVector.values[i],
					0
				);

				// Calculate magnitudes
				const userMagnitude = Math.sqrt(
					(userVector.values as number[]).reduce(
						(sum: number, val: number) => sum + val * val,
						0
					)
				);

				const articleMagnitude = Math.sqrt(
					(articleVector.values as number[]).reduce(
						(sum: number, val: number) => sum + val * val,
						0
					)
				);

				// Calculate normalized similarity (0-1)
				const similarity = dotProduct / (userMagnitude * articleMagnitude);

				// Determine severity
				let severity;
				if (similarity < 0.6) severity = 'low';
				else if (similarity < 0.7) severity = 'mid';
				else severity = 'high';

				return { ...article, similarity, severity };
			})
		);

		const response = {
			topic: dbTopic.name,
			count: articlesWithSimilarity.length,
			articles: articlesWithSimilarity,
		};

		// Cache the response for one day
		await kv.put(cacheKey, JSON.stringify(response), { expirationTtl: 86400 });

		return c.json(response);
	} catch (error) {
		console.error((error as Error).message);
		return c.json({ error: 'An error occurred while fetching articles' }, 500);
	}
});

userRouter.get('/topics', async c => {
	try {
		const db = drizzle(c.env.DB);
		const showSubscribedOnly = c.req.query('subscribed') === 'true';
		const user = c.get('user') as User;

		const baseQuery = db
			.select({
				id: topics.id,
				name: topics.name,
			})
			.from(topics);

		const subscribedQuery = db
			.select({
				id: topics.id,
				name: topics.name,
			})
			.from(topics)
			.innerJoin(
				userTopicSubscriptions,
				eq(userTopicSubscriptions.topicId, topics.id)
			)
			.where(eq(userTopicSubscriptions.userId, user.id));

		const allTopics = await (showSubscribedOnly
			? subscribedQuery
			: baseQuery
		).all();

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

userRouter
	.get('/user', async c => {
		const user = c.get('user');
		return c.json({
			success: true,
			user: {
				userId: user.userId,
				researchField: user.researchField,
				bio: user.bio,
			},
		});
	})
	.put(async c => {
		const user = c.get('user');
		const { researchField, bio } = await c.req.json<{
			researchField: string;
			bio: string;
		}>();

		try {
			const db = drizzle(c.env.DB);
			const updatedUser = await db
				.update(users)
				.set({
					researchField,
					bio,
				})
				.where(eq(users.userId, user.userId))
				.returning()
				.get();

			try {
				await c.env.QUEUE.send(
					JSON.stringify({
						type: 'user.updated',
						userId: user.userId,
						researchField,
						bio,
					})
				);
			} catch (error) {
				console.error((error as Error).message);
				return c.json({ error: 'An error occurred while updating user' }, 500);
			}

			return c.json({
				success: true,
				user: {
					userId: updatedUser.userId,
					researchField: updatedUser.researchField,
					bio: updatedUser.bio,
				},
			});
		} catch (error) {
			console.error((error as Error).message);
			return c.json({ error: 'An error occurred while updating user' }, 500);
		}
	});

interface CachedHNArticleData {
	articles: any[]; // Replace 'any' with a more specific type if you have one for articles
	// Add other properties if needed
}
userRouter.get('/hacker-news', async c => {
	try {
		const cacheKey = 'hacker-news-articles';

		// Try to get cached data from KV
		let cachedData = await c.env.KV.get<CachedHNArticleData>(cacheKey, 'json');

		if (cachedData) {
			return c.json({
				success: true,
				count: cachedData.articles.length,
				articles: cachedData.articles,
				cached: true,
			});
		}

		const db = drizzle(c.env.DB);

		// Calculate the date 7 days ago
		const oneWeekAgo = new Date();
		oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
		const oneWeekAgoISO = oneWeekAgo.toISOString();

		// Fetch HackerNews articles from the last week
		const articles = await db
			.select()
			.from(hackerNewsArticles)
			.where(gte(hackerNewsArticles.published, oneWeekAgoISO))
			.orderBy(desc(hackerNewsArticles.published))
			.limit(30);

		// Prepare the response data
		const responseData = {
			success: true,
			count: articles.length,
			articles: articles,
		};

		// Cache the data in KV for one week (604800 seconds)
		await c.env.KV.put(cacheKey, JSON.stringify(responseData), {
			expirationTtl: 604800,
		});

		return c.json(responseData);
	} catch (error) {
		console.error('Error fetching Hacker News articles:', error);
		return c.json(
			{ error: 'An error occurred while fetching Hacker News articles' },
			500
		);
	}
});

const superUserRouter = new Hono<{
	Bindings: Env;
}>();

superUserRouter.use('*', superUserAuthMiddleware);

// Add a dummy Hello World route for superUser
superUserRouter.get('/hello', c => {
	return c.json({ message: 'Hello, SuperUser!' });
});

superUserRouter.post('/clear-cache', async c => {
	try {
		const kv = c.env.KV;

		// List all keys in the KV store
		let keys = await kv.list();
		let deletedCount = 0;

		// Delete all keys
		for (const key of keys.keys) {
			await kv.delete(key.name);
			deletedCount++;
		}

		return c.json({
			success: true,
			message: `Cache cleared. ${deletedCount} keys deleted.`,
		});
	} catch (error) {
		console.error('Error clearing cache:', error);
		return c.json(
			{
				success: false,
				error: 'An error occurred while clearing the cache',
			},
			500
		);
	}
});

interface HackerNewsStory {
	url?: string;
	title: string;
	score: number;
	by: string;
	time: number;
}
superUserRouter.get('/hacker-news', async c => {
	try {
		// Fetch the latest story IDs
		const response = await fetch(
			'https://hacker-news.firebaseio.com/v0/topstories.json'
		);
		const storyIds = (await response.json()) as number[];

		// Fetch details for each story
		const storiesPromises = storyIds.map(id =>
			fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
				res => res.json() as Promise<HackerNewsStory>
			)
		);
		const stories: HackerNewsStory[] = await Promise.all(storiesPromises);
		const db = drizzle(c.env.DB);

		// Process and store each story
		const processedStories = await Promise.all(
			stories.map(async story => {
				if (!story.url) {
					return null; // Skip items without URLs (e.g., "Ask HN" posts)
				}
				try {
					// Check if the article already exists in the database
					const existingArticle = await db
						.select()
						.from(hackerNewsArticles)
						.where(eq(hackerNewsArticles.url, story.url))
						.limit(1);

					if (existingArticle.length > 0) {
						// Update the existing article
						await db
							.update(hackerNewsArticles)
							.set({
								title: story.title,
								points: story.score,
								author: story.by,
								published: new Date(story.time * 1000).toISOString(),
							})
							.where(eq(hackerNewsArticles.url, story.url));

						return existingArticle[0];
					} else {
						// Insert a new article
						const newArticle: NewHackerNewsArticle = {
							title: story.title,
							url: story.url,
							points: story.score,
							author: story.by,
							published: new Date(story.time * 1000).toISOString(),
						};

						const insertResult = await db
							.insert(hackerNewsArticles)
							.values(newArticle)
							.returning();
						return insertResult[0];
					}
				} catch (error) {
					console.error(`Error processing article ${story.url}:`, error);
					return null;
				}
			})
		);

		const validStories = processedStories.filter(story => story !== null);

		return c.json(validStories);
	} catch (error) {
		console.error('Error fetching Hacker News data:', error);
		return c.json({ error: 'Failed to fetch Hacker News data' }, 500);
	}
});

app.route('/super', superUserRouter);
app.route('/', userRouter);

export default app;
