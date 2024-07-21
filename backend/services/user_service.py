from db import db
from schemas.user_schema import user_schema, is_objectid
from cerberus import Validator
from bson import ObjectId

users_collection = db.users
validator = Validator(user_schema)
validator.add_check(is_objectid)

def add_user(user_data):
    if validator.validate(user_data):
        user_data['subscribed_topics'] = [ObjectId(topic) for topic in user_data['subscribed_topics']]
        users_collection.insert_one(user_data)
        return {"message": "User added successfully!"}
    else:
        return {"message": validator.errors}

def get_all_users():
    users = list(users_collection.find({}, {'_id': 0}))
    return users

def get_user_by_key_value(key, value):
    if key == "_id" and ObjectId.is_valid(value):
        value = ObjectId(value)
    user = users_collection.find_one({key: value}, {'_id': 0})
    return user if user else {"message": "No user found!"}

def update_user(query, update):
    if '_id' in query and ObjectId.is_valid(query['_id']):
        query['_id'] = ObjectId(query['_id'])
    if 'subscribed_topics' in update:
        update['subscribed_topics'] = [ObjectId(topic) for topic in update['subscribed_topics']]
    result = users_collection.update_many(query, {'$set': update})
    return {"message": f"{result.modified_count} users updated!"}

def delete_user(query):
    if '_id' in query and ObjectId.is_valid(query['_id']):
        query['_id'] = ObjectId(query['_id'])
    result = users_collection.delete_many(query)
    return {"message": f"{result.deleted_count} users deleted!"}
