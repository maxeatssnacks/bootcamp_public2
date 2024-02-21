from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database"""
    db.app = app
    db.init_app(app)

class User(db.Model):
    """User."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first = db.Column(db.String(25), nullable=False)
    last = db.Column(db.String(25), nullable=False)
    imageURL = db.Column(db.String, default="https://i.stack.imgur.com/l60Hf.png")

    def full_name(self):
        """Return the full name of the user."""
        return f"{self.first} {self.last}"