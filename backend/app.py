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
    user_id = data['user_id']
    join_room(user_id)
    print(f'Client joined room: {user_id}')

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)

