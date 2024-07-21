from db import db
from schemas import User

users_collection = db.users

def add_user(data):
    user = User(persona=data['persona'], username=data['username'], email=data['email'])
    user_id = users_collection.insert_one(user.to_dict()).inserted_id
    return str(user_id)

def get_all_users():
    users = list(users_collection.find())
    output = []
    for user in users:
        user['_id'] = str(user['_id'])  # Convert ObjectId to string
        output.append(user)
    return output
