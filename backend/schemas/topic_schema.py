from typing import List, Dict, Any

class Article:
    def __init__(self, title: str, authors: List[str], abstract: str, topics: List[str], url: str, date: str):
        self.title = title
        self.authors = authors
        self.abstract = abstract
        self.topics = topics
        self.url = url
        self.date = date

    def to_dict(self) -> Dict[str, Any]:
        return {
            "title": self.title,
            "authors": self.authors,
            "abstract": self.abstract,
            "topics": self.topics,
            "url": self.url,
            "date": self.date
        }



class Topic:
    def __init__(self, name: str, subscribed_users: List[str], articles: List[Article]):
        self.name = name
        self.subscribed_users = subscribed_users
        self.articles = articles

    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "subscribed_users": self.subscribed_users,
            "articles": [article.to_dict() for article in self.articles]
        }
