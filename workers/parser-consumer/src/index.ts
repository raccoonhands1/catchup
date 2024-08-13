import { Ai, KVNamespace, VectorizeIndex } from '@cloudflare/workers-types';
import dedent from 'dedent';

interface Env {
	AI: Ai;
	KV: KVNamespace;
	VECTORIZE_INDEX: VectorizeIndex;
}

interface Message {
	type: 'user.updated' | 'paper.inserted';
}
interface UserUpdatedMessage extends Message {
	type: 'user.updated';
	userId: string;
	researchFields: string;
	bio: string;
}
interface PaperInsertedMessage extends Message {
	type: 'paper.inserted';
	id: number;
	arxivId: string;
	title: string;
	summary: string;
	pdf: string;
	authors: string;
	published: string;
}

interface User {
	researchFields: string;
	bio: string;
	userId: string;
}

interface EmbeddingResponse {
	shape: number[];
	data: number[][];
}

async function generateUserSummaryVector(env: Env, user: User) {
	const prompt = dedent`
    Generate a realistic arXiv-style abstract based on the following user information:

    Research Fields: ${user.researchFields}
    Bio: ${user.bio}

    Create a detailed, technical abstract (about 200-250 words) that reflects the user's research interests.
    The abstract should:
    1. Introduce a complex concept or problem in the user's field
    2. Describe a novel approach or experiment to address this problem
    3. Mention specific techniques, models, or equipment used
    4. Provide some quantitative results or improvements
    5. Conclude with the significance of the findings

    Use appropriate technical jargon and include relevant equations or symbols if applicable.
    The abstract should read like a genuine research paper abstract in the user's field of study.

    Important: Provide only the abstract content without any introductory text or additional commentary.
`;

	const genResp: BaseAiTextGeneration['postProcessedOutputs'] = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
		messages: [{ role: 'user', content: prompt }],
	});

	if (genResp instanceof ReadableStream) {
		throw new Error('Unexpected stream response');
	}
	const summary = genResp.response as string;
	const embeddingResp: EmbeddingResponse = await env.AI.run('@cf/baai/bge-base-en-v1.5', {
		text: summary,
	});

	const vector: VectorizeVector = {
		id: `user-${user.userId}`,
		values: embeddingResp.data[0],
		metadata: {
			summary,
			userId: user.userId,
			researchFields: user.researchFields,
			bio: user.bio,
		},
	};

	await env.KV.put(`user-vector-${user.userId}`, JSON.stringify(vector));
}

async function generatePaperVector(env: Env, paper: PaperInsertedMessage) {
	// Check if the paper has already been processed
	const processedKey = `processed:arxiv:${paper.arxivId}`;
	const alreadyProcessed = await env.KV.get(processedKey);

	if (alreadyProcessed) {
		console.log(`ArXiv paper ${paper.arxivId} already processed, skipping.`);
		return;
	}

	const embeddingResp: EmbeddingResponse = await env.AI.run('@cf/baai/bge-base-en-v1.5', {
		text: paper.summary,
	});

	const vector: VectorizeVector = {
		id: `paper-${paper.id}`,
		values: embeddingResp.data[0],
		metadata: {
			id: paper.id,
			arxivId: paper.arxivId,
			title: paper.title,
			summary: paper.summary,
			pdf: paper.pdf,
			authors: paper.authors,
			published: paper.published,
		},
	};

	await env.VECTORIZE_INDEX.upsert([vector]);

	await env.KV.put(processedKey, JSON.stringify(vector));
}

export default {
	async queue(batch: MessageBatch<unknown>, env: Env): Promise<void> {
		await Promise.all(
			batch.messages.map(async (message) => {
				try {
					const msg = JSON.parse(message.body as string) as Message;
					if (msg.type === 'user.updated') {
						const { userId, researchFields, bio } = msg as UserUpdatedMessage;
						await generateUserSummaryVector(env, { userId, researchFields, bio });
					} else if (msg.type === 'paper.inserted') {
						await generatePaperVector(env, msg as PaperInsertedMessage);
					} else {
						console.error('Unknown message type:', msg.type);
					}
				} catch (error) {
					console.error('Error processing message:', error);
				}
			})
		);
	},
} satisfies ExportedHandler<Env>;
