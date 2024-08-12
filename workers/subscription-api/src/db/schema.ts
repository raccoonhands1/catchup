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
		.references(() => papers.id),
	topicId: integer('topic_id')
		.notNull()
		.references(() => topics.id),
});

export type Paper = typeof papers.$inferSelect;
export type NewPaper = typeof papers.$inferInsert;
export type Topic = typeof topics.$inferSelect;
export type NewTopic = typeof topics.$inferInsert;
