from flask import Flask
from flask_cors import CORS
from routes.search import search_bp
from routes.history import history_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000"]}})

app.register_blueprint(search_bp)
app.register_blueprint(history_bp)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)