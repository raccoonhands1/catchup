import { Hono } from 'hono';
import { Queue, QueueContentType } from '@cloudflare/workers-types';
import { XMLParser } from 'fast-xml-parser';

interface Env {
	QUEUE: Queue;
	APP_SECRET: string;
}

const app = new Hono<{ Bindings: Env }>();

const authMiddleware = async (c: any, next: () => Promise<void>) => {
	const authHeader = c.req.header('Authorization');
	if (!authHeader || authHeader !== `Bearer ${c.env.APP_SECRET}`) {
		return c.json({ error: 'Unauthorized' }, 401);
	}
	await next();
};

app.use(authMiddleware);

interface Paper {
	title: string;
	summary: string;
	pdf: string;
	//authors: string[];
	authors: string;
	published: string;
	arxivId: string;
}

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
		const recentArticles = articles.filter(
			article => new Date(article.published) >= sevenDaysAgo
		);

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
		//await c.env.QUEUE.sendBatch(
		//	articles.map(article => ({
		//		body: JSON.stringify(article),
		//		contentType: 'application/json' as QueueContentType,
		//	}))
		//);
		return c.json({ success: true, count: articles.length, articles });
	} catch (error) {
		console.error((error as Error).message);
	}
});

export default app;
