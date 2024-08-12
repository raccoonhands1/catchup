CREATE TABLE `papers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`arxiv_id` text NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`pdf` text NOT NULL,
	`authors` text NOT NULL,
	`published` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `papers_arxiv_id_unique` ON `papers` (`arxiv_id`);