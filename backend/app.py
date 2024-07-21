from flask import Flask, request, jsonify
from services import user_service, topic_service

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the Flask MongoDB App!"

# User routes
@app.route('/users', methods=['POST'])
def add_user():
    user_data = request.json
    return jsonify(user_service.add_user(user_data)), 201

@app.route('/users', methods=['GET'])
def get_all_users():
    return jsonify(user_service.get_all_users()), 200

@app.route('/users/<string:key>/<string:value>', methods=['GET'])
def get_user_by_key_value(key, value):
    return jsonify(user_service.get_user_by_key_value(key, value)), 200

@app.route('/users', methods=['PUT'])
def update_user():
    query = request.json.get('query')
    update = request.json.get('update')
    return jsonify(user_service.update_user(query, update)), 200

@app.route('/users', methods=['DELETE'])
def delete_user():
    query = request.json
    return jsonify(user_service.delete_user(query)), 200

# Topic routes
@app.route('/topics', methods=['POST'])
def add_topic():
    topic_data = request.json
    return jsonify(topic_service.add_topic(topic_data)), 201

@app.route('/topics', methods=['GET'])
def get_all_topics():
    return jsonify(topic_service.get_all_topics()), 200

@app.route('/topics/<string:key>/<string:value>', methods=['GET'])
def get_topic_by_key_value(key, value):
    return jsonify(topic_service.get_topic_by_key_value(key, value)), 200

@app.route('/topics', methods=['PUT'])
def update_topic():
    query = request.json.get('query')
    update = request.json.get('update')
    return jsonify(topic_service.update_topic(query, update)), 200

@app.route('/topics', methods=['DELETE'])
def delete_topic():
    query = request.json
    return jsonify(topic_service.delete_topic(query)), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)

