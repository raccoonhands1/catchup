'use server';
import { auth } from '@clerk/nextjs/server';

interface UserProfile {
	userId: string;
	researchField: string | null;
	bio: string | null;
}

export async function getUserProfile(): Promise<UserProfile> {
	const { getToken } = auth();
	const token = await getToken({ template: 'default' });

	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: 'no-store' as RequestCache,
	};

	try {
		const res = await fetch(`${process.env.WORKER_API_URL}/user`, options);

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();
		return data.user;
	} catch (error) {
		console.error('Failed to fetch user profile:', error);
		throw error;
	}
}

export async function updateUserProfile(
	researchField: string,
	bio: string
): Promise<UserProfile> {
	const { getToken } = auth();
	const token = await getToken({ template: 'default' });

	const options = {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ researchField, bio }),
		cache: 'no-store' as RequestCache,
	};

	try {
		const res = await fetch(`${process.env.WORKER_API_URL}/user`, options);

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();
		return data.user;
	} catch (error) {
		console.error('Failed to update user profile:', error);
		throw error;
	}
}
