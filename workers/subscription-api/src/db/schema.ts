import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const papers = sqliteTable('papers', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	arxivId: text('arxiv_id').notNull().unique(),
	title: text('title').notNull(),
	summary: text('summary').notNull(),
	pdf: text('pdf').notNull(),
	authors: text('authors').notNull(),
	published: text('published').notNull(),
});
export const topics = sqliteTable('topics', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
});

export const paperTopics = sqliteTable('paper_topics', {
	paperId: integer('paper_id')
		.notNull()
		.references(() => papers.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	topicId: integer('topic_id')
		.notNull()
		.references(() => topics.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});

export const hackerNewsArticles = sqliteTable('hackernews_articles', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	url: text('url').notNull(),
	points: integer('points'),
	author: text('author'),
	published: text('published').notNull(),
});

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: text('user_id').notNull().unique(),
	researchField: text('research_field'),
	bio: text('bio'),
});

export const hackerNewsArticleTopics = sqliteTable(
	'hackernews_article_topics',
	{
		articleId: integer('article_id')
			.notNull()
			.references(() => hackerNewsArticles.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
		topicId: integer('topic_id')
			.notNull()
			.references(() => topics.id, {
				onDelete: 'cascade',
				onUpdate: 'cascade',
			}),
	}
);

export const userTopicSubscriptions = sqliteTable('user_topic_subscriptions', {
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	topicId: integer('topic_id')
		.notNull()
		.references(() => topics.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});

export type Paper = typeof papers.$inferSelect;
export type NewPaper = typeof papers.$inferInsert;
export type Topic = typeof topics.$inferSelect;
export type NewTopic = typeof topics.$inferInsert;
export type HackerNewsArticle = typeof hackerNewsArticles.$inferSelect;
export type NewHackerNewsArticle = typeof hackerNewsArticles.$inferInsert;
export type User = typeof users.$inferSelect;
