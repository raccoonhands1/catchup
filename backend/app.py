from flask import Flask
from flask_socketio import SocketIO, join_room
from routes.user_routes import user_bp
from routes.topic_routes import topic_bp

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

app.register_blueprint(user_bp)
app.register_blueprint(topic_bp)

@app.route('/')
def home():
    return "Welcome to the Flask MongoDB App!"

@socketio.on('join')
def on_join(data):
    topic_id = data['topic_id']
    join_room(topic_id)
    print(f'Client joined room: {topic_id}')

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)

