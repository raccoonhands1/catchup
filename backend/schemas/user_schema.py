from cerberus import Validator
from bson import ObjectId

def is_objectid(field, value, error):
    if not ObjectId.is_valid(value):
        error(field, "Invalid ObjectId")

user_schema = {
    'username': {'type': 'string', 'minlength': 1, 'required': True},
    'subscribed_topics': {'type': 'list', 'schema': {'type': 'string', 'check_with': is_objectid}, 'required': True}
}
