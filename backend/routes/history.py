from flask import Blueprint, jsonify, Response
from db import collection

history_bp = Blueprint('history', __name__)

@history_bp.route('/movies/history', methods=['GET'])
def get_history() -> Response:
    try:
        history = list(collection.find({}, {"_id": 0}))
        return jsonify(history)
    except Exception as e:
        return jsonify({"error": str(e)}), 500