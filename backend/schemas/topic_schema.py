from cerberus import Validator
from bson import ObjectId

def is_objectid(field, value, error):
    if not ObjectId.is_valid(value):
        error(field, "Invalid ObjectId")

topic_schema = {
    'topicname': {'type': 'string', 'minlength': 1, 'required': True},
    'subscribed_users': {'type': 'list', 'schema': {'type': 'string', 'check_with': is_objectid}, 'required': True},
    'articles': {'type': 'list', 'schema': {'type': 'string', 'check_with': is_objectid}, 'required': True}
}
