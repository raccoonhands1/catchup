export interface ITopic {
	id: number;
	name: string;
}

export interface Article {
	id: number;
	arxivId: string;
	title: string;
	summary: string;
	pdf: string;
	authors: string;
	published: string;
	severity: 'low' | 'mid' | 'high';
}

export interface Comment {
	text: string;
	author: string;
	time: string;
	likes: number;
	authorPosition: string;
}

export type CommentBoxProps = {
	comments: Comment[];
};
