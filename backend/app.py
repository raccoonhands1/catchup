from flask import Flask
from flask_socketio import SocketIO
from routes.user_routes import user_bp
from routes.topic_routes import topic_bp

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

app.register_blueprint(user_bp)
app.register_blueprint(topic_bp)

@app.route('/')
def home():
    return "Welcome to the Flask MongoDB App!"

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)

