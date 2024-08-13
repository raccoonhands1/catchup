CREATE TABLE `hackernews_article_topics` (
	`article_id` integer NOT NULL,
	`topic_id` integer NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `hackernews_articles`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `hackernews_articles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`points` integer,
	`author` text,
	`published` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user_topic_subscriptions` (
	`user_id` integer NOT NULL,
	`topic_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`topic_id`) REFERENCES `topics`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`research_field` text,
	`bio` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_user_id_unique` ON `users` (`user_id`);