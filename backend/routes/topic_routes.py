# routes/topic_routes.py
from flask import Blueprint, request, jsonify
from services import topic_service

# Create a Blueprint for topic routes
topic_bp = Blueprint('topic_bp', __name__)

# Create
@topic_bp.route('/topic', methods=['POST'])
def add_topic_route():
    data = request.get_json()
    topic_id = topic_service.add_topic(data)
    return jsonify({"result": topic_id}), 201
