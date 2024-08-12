-- Migration: Add cascade behavior to paper_topics table
-- Filename: add_cascade_to_paper_topics.sql

-- First, we need to drop the existing table
DROP TABLE IF EXISTS paper_topics;

-- Recreate the table with cascade behavior
CREATE TABLE paper_topics (
    paper_id INTEGER NOT NULL,
    topic_id INTEGER NOT NULL,
    FOREIGN KEY (paper_id) REFERENCES papers(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Optionally, you might want to add an index to improve query performance
CREATE INDEX idx_paper_topics_paper_id ON paper_topics(paper_id);
CREATE INDEX idx_paper_topics_topic_id ON paper_topics(topic_id);
-- Custom SQL migration file, put you code below! --