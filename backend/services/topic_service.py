from db import db

topics_collection = db.topics

def add_topic(topic_data):
    topics_collection.insert_one(topic_data)
    return {"message": "Topic added successfully!"}

def get_all_topics():
    topics = list(topics_collection.find({}, {'_id': 0}))
    return topics

def get_topic_by_key_value(key, value):
    topic = topics_collection.find_one({key: value}, {'_id': 0})
    return topic if topic else {"message": "No topic found!"}

def update_topic(query, update):
    result = topics_collection.update_many(query, {'$set': update})
    return {"message": f"{result.modified_count} topics updated!"}

def delete_topic(query):
    result = topics_collection.delete_many(query)
    return {"message": f"{result.deleted_count} topics deleted!"}
