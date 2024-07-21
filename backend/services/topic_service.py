from db import db
from schemas import Article, Topic

topics_collection = db.topics

def add_topic(data) -> str:
    articles_data = data.get('articles', [])
    articles = [Article(
        title=article['title'],
        authors=article['authors'],
        abstract=article['abstract'],
        topics=article['topics'],
        url=article['url'],
        date=article['date']
    ) for article in articles_data]
    
    topic = Topic(
        name=data['name'],
        subscribed_users=data['subscribed_users'],
        articles=articles
    )
    
    topic_id = topics_collection.insert_one(topic.to_dict()).inserted_id
    return str(topic_id)
