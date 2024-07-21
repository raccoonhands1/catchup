import os
import agentops

from typing import List
from groq import Groq
from crewai import Agent, Task, Crew, Process
from mem0 import Memory
from crewai_tools import tool
from multion.client import MultiOn
from dotenv import load_dotenv

load_dotenv()


class ArXivPapersRetriever:
    def __init__(self):
        self.api_key = os.getenv("MULTION_API_KEY")
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.client = MultiOn(api_key=self.api_key)
        self.groq_client = Groq(api_key=self.groq_api_key)
        self.memory = Memory()

        self.setup_environment()
        self.setup_agents_and_tasks()

        agentops.init(os.environ.get('AGENT_OPS_API_KEY'))

    def setup_environment(self):
        os.environ["OPENAI_API_BASE"] = "https://api.groq.com/openai/v1"
        os.environ["OPENAI_MODEL_NAME"] = "gemma2-9b-it"
        os.environ["OPENAI_API_KEY"] = self.groq_api_key

    @tool("ArXiv Papers Retrieval Tool")
    def retrieve_latest_arxivs(self) -> List[dict]:
        """ Retrieve the latest CS papers from arxiv.org from the past 7 days """
        retrieve_response = self.client.retrieve(
            cmd="find 10 latest computer science arxiv article in the past 7 days and return its info",
            url="https://arxiv.org/list/cs/new",
            fields=["title", "authors", "time", "abstract", "url"]
        )
        return retrieve_response.data

    @tool("Summarize and Categorize Articles Tool")
    def summarize_and_categorize_articles(self, articles: str) -> str:
        """ Summarize and categorize the articles """
        chat_completion = self.groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "the user will give you a structured list of articles, you summarize each article, categorize it, and tag it (tag examples: computer networking, distributed system, AI...)"
                },
                {
                    "role": "user",
                    "content": articles
                }
            ],
            model="gemma2-9b-it"
        )
        return chat_completion.choices[0].message.content

    def setup_agents_and_tasks(self):
        self.PapersCollector = Agent(
            role="Papers Collector",
            goal="retrieve the latest CS papers from arxiv.org within the last 7 days",
            backstory="you are a bot that helps researchers to find the latest papers in computer science",
            verbose=True,
            tools=[self.retrieve_latest_arxivs],
        )

        self.Summarizer = Agent(
            role="Summarizer",
            goal="""
                given a structured list of articles, you summarize each article, categorize it, and tag it (tag examples: computer networking, distributed system, AI...)
                output in structured JSON format, only output the processed JSON including fields of arxiv_id, summary and tags without any other text or delimiters
            """,
            backstory="you are a bot that helps researchers to summarize and categorize papers",
            tools=[self.summarize_and_categorize_articles],
            verbose=True,
        )

        self.retrieve_archive_articles = Task(
            description="Retrieve the latest articles from arxiv.org",
            expected_output="A list of dictionaries containing the title, authors, time, abstract, and url of the latest CS papers from arxiv.org from the past 7 days",
            agent=self.PapersCollector,
        )

        self.summarize_and_categorize = Task(
            description="Summarize and categorize the articles",
            expected_output="A structured JSON containing the fields of arxiv_id, summary, and tags for each article",
            agent=self.Summarizer,
        )

        self.crew = Crew(
            agents=[self.PapersCollector, self.Summarizer],
            tasks=[self.retrieve_archive_articles,
                   self.summarize_and_categorize],
            verbose=2,
            process=Process.sequential,
        )

    def run(self):
        self.crew.kickoff()


if __name__ == "__main__":
    retriever = ArXivPapersRetriever()
    retriever.run()
