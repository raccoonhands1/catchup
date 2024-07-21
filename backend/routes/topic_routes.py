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
    context = request.get_json()['context']
    res = topic_service.add_articles(data, context)
    return jsonify({'result': res}), 201

# Read All
@topic_bp.route('/topics', methods=['GET'])
def get_topics():
    topics = topic_service.get_all_topics()
    return jsonify(topics), 200
