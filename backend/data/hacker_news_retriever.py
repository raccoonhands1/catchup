import os
import agentops

from typing import List
from multion.client import MultiOn
from crewai_tools import tool
from mem0 import Memory
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process

load_dotenv()


class HackernewsPostsRetriever:
    def __init__(self):
        self.api_key = os.getenv("MULTION_API_KEY")
        self.client = MultiOn(api_key=self.api_key)
        self.memory = Memory()

        self.setup_environment()
        self.setup_agents_and_tasks()

        agentops.init(os.environ.get('AGENT_OPS_API_KEY'))

    def setup_environment(self):
        agentops.init(os.environ.get('AGENT_OPS_API_KEY'))

    @tool("Hackernews Posts Retrieval Tool")
    def retrieve_hackernews_posts(self) -> List[dict]:
        """Retrieve all posts on Hackernews with specified fields"""
        retrieve_response = self.client.retrieve(
            cmd="Get all posts on Hackernews with title, creator, time created, points as a number, number of comments as a number, and the post URL.",
            url="https://news.ycombinator.com/",
            fields=["title", "creator", "time", "points", "comments", "url"],
            local=True
        )
        return retrieve_response.data

    def setup_agents_and_tasks(self):
        self.PostsCollector = Agent(
            role="Posts Collector",
            goal="retrieve all posts on Hackernews with specified fields",
            backstory="you are a bot that helps users find the latest posts on Hackernews",
            verbose=True,
            tools=[self.retrieve_hackernews_posts],
        )

        self.retrieve_posts_task = Task(
            description="Retrieve the latest posts from Hackernews",
            expected_output="A list of dictionaries containing the title, creator, time created, points, number of comments, and URL of the posts from Hackernews",
            agent=self.PostsCollector,
        )

        self.crew = Crew(
            agents=[self.PostsCollector],
            tasks=[self.retrieve_posts_task],
            verbose=2,
            process=Process.sequential,
        )

    def run(self):
        self.crew.kickoff()


if __name__ == "__main__":
    retriever = HackernewsPostsRetriever()
    retriever.run()
