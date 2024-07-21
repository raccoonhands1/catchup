# routes/topic_routes.py
from flask import Blueprint, request, jsonify
from services import topic_service

# Create a Blueprint for topic routes
topic_bp = Blueprint('topic_bp', __name__)

# Create
@topic_bp.route('/topics', methods=['POST'])
def add_topic_route():
    data = request.get_json()
    topic_id = topic_service.add_topic(data)
    return jsonify({"result": topic_id}), 201


@topic_bp.route("/topic/update", methods=['POST'])
def update_topics():
    data = request.get_json()['articles']
    res = topic_service.add_articles(data)
    return jsonify({'result': res}), 201

# Read All
@topic_bp.route('/topics', methods=['GET'])
def get_topics():
    topics = topic_service.get_all_topics()
    return jsonify(topics), 200

# Read All reasearch topics
@topic_bp.route('/research', methods=['GET'])
def get_topics():
    topics = topic_service.get_all_topics()
    my_topics = []
    for topic in topics:
        if topic["type"] == "research":
            my_topics.append(topic)
    return jsonify(my_topics), 200

# Read All news topics
@topic_bp.route('/news', methods=['GET'])
def get_topics():
    topics = topic_service.get_all_topics()
    my_topics = []
    for topic in topics:
        if topic["type"] == "news":
            my_topics.append(topic)
    return jsonify(topics), 200
