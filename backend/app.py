from flask import Flask
from flask_socketio import SocketIO, join_room
from routes.user_routes import user_bp
from routes.topic_routes import topic_bp

app = Flask(__name__)

app.register_blueprint(user_bp)
app.register_blueprint(topic_bp)

@app.route('/')
def home():
    return "Welcome to the Flask MongoDB App!"

if __name__ == '__main__':
    app.run(debug=True)


