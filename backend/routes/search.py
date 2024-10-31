import os
import re
import requests
from flask import Blueprint, request, jsonify, Response
from datetime import datetime

from db import collection


search_bp = Blueprint('search', __name__)

API_URL = "https://the-one-api.dev/v2/movie"
HEADERS = {"Authorization": f"Bearer {os.environ.get('API_KEY')}"}

@search_bp.route('/movies/search', methods=['POST'])
def search_movie() -> Response:
    response = requests.get(API_URL, headers=HEADERS)

    if response.status_code != 200:
        return jsonify({"error": "Erro ao consultar a API de filmes."}), response.status_code
    
    movies_data = response.json()
    movies_list = movies_data.get('docs', [])

    data = request.get_json()
    name = data.get('name')
    movie = data.get('movie')

    _registry_request(movie=movie, name=name)

    if not name or not movie:
        return jsonify({"error": "Nome e título do filme são obrigatórios."}), 400
    
    existing_movies = [movie_data for movie_data in movies_list if re.search(movie, movie_data["name"], re.IGNORECASE)]
    
    return jsonify({"existing_records": existing_movies}), 200


def _registry_request(name: str, movie: str) -> None:
    search_entry = {
        "name": name.upper(),
        "movie": movie.upper(),
        "date": datetime.now()
    }
    
    collection.insert_one(search_entry)