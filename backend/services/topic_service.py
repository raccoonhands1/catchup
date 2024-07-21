from db import db
from schemas import Article, Topic
from typing import List
from bson.objectid import ObjectId
<<<<<<< HEAD
from severity import getSeverity, changeContext
=======
from flask_socketio import emit
from services import user_service
>>>>>>> cdeb9725327067e6138993bb05cc0618acc304bb

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
        articles=articles
    )
    
    topic_id = topics_collection.insert_one(topic.to_dict()).inserted_id
    return str(topic_id)

def get_all_topics():
    topics = topics_collection.find()
    output = []
    for topic in topics:
        topic['_id'] = str(topic['_id'])  # Convert ObjectId to string d
        output.append(topic)
    return output


def add_articles(articles_data):
    # Create Article objects from the provided data
    articles = [Article(
        title=article['title'],
        authors=article['authors'],
        abstract=article['abstract'],
        topics=article['topics'],
        url=article['url'],
        date=article['date'],
        # severity=getSeverity("research paper", article['abstract'])
    ) for article in articles_data]

    topics = get_all_topics()
    users = user_service.get_all_users()
    articles_to_add = {}

    for topic in topics:
        topic_id = topic['_id']
        articles_for_topic = []
        
        for article in articles:
            if topic['name'] in article.topics:
                articles_for_topic.append(article.to_dict())

        if articles_for_topic:  # Only add non-empty lists
            articles_to_add[topic_id] = articles_for_topic

    for topic_id, articles in articles_to_add.items():
        topics_collection.update_one(
            {'_id': ObjectId(topic_id)},
            {'$push': {'articles': {'$each': articles}}}
        )
        subscribed_users = []
        for user in users:
            if topic_id in user.
        emit('new_articles', {'topic_id': topic_id, 'articles': articles}, room=topic_id)

    

    output = []

    changeContext("researcher", "research company")
    
    for article in articles:
        article['severity'] = getSeverity("research paper", article['abstract'])
        output.append(article)

    return output