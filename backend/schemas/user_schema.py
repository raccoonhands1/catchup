from typing import List, Dict, Any

class User:
    def __init__(self, persona: str, email: str, username: str, subscribed_topics: List[str]):
        self.persona = persona
        self.email = email
        self.username = username
        self.subscribed_topics = subscribed_topics

    def to_dict(self):
        return {
            "persona": self.persona,
            "username": self.username,
            "email": self.email,
            "subscribed_topics": self.subscribed_topics
        }
