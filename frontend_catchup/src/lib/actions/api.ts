'use server';

export async function getTopics() {
	try {
		const options = {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${process.env.WORKER_API_APP_SECRET}`,
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