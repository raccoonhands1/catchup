class User:
    def __init__(self, persona: str, email: str, username: str):
        self.persona = persona
        self.email = email
        self.username = username

    def to_dict(self):
        return {
            "persona": self.persona,
            "username": self.username,
            "email": self.email
        }
