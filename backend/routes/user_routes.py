# routes/user_routes.py
from flask import Blueprint, request, jsonify
from services import user_service
from typing import Dict, Any

# Create a Blueprint for user routes
user_bp = Blueprint('user_bp', __name__)

# Create
@user_bp.route('/users', methods=['POST'])
def add_user():
    user_data: Dict[str, Any] = request.json
    return jsonify(user_service.add_user(user_data)), 201

# Read All
@user_bp.route('/users', methods=['GET'])
def get_all_users():
    return jsonify(user_service.get_all_users()), 200
