from cerberus import Validator

article_schema = {
    'title': {'type': 'string', 'minlength': 1, 'required': True},
    'body': {'type': 'string', 'required': True},
    'comments': {'type': 'list', 'schema' : {'type': 'string'}}
}
