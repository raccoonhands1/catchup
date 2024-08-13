'use server';
import { auth } from '@clerk/nextjs/server';

export async function getTopics() {
	const { getToken } = auth();
	try {
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${await getToken({ template: 'default' })}`,
			},
		};
		const res = await fetch(`${process.env.WORKER_API_URL}/topics`, options);

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();
		const topics = data.topics;

		return topics;
	} catch (error) {
		console.error('Failed to fetch topics:', error);
		throw error;
	}
}

export async function getArticlesForTopic(topicId: string) {
	const { getToken } = auth();
	try {
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${await getToken({ template: 'default' })}`,
			},
		};
		const res = await fetch(
			`${process.env.WORKER_API_URL}/articles/${topicId}`,
			options
		);

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();
		console.log(data.topic);
		return data.articles;
	} catch (error) {
		console.error('Failed to fetch articles for topic:', error);
		throw error;
	}
}
