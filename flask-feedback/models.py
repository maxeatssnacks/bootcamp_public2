"""Models for Cupcake app."""

from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    """Connect to database"""
    db.app = app
    db.init_app(app)


class User(db.Model):
    """User model."""

    __tablename__ = "users"

    username = db.Column(db.String(20), primary_key=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String(50), nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    # Define the relationship to Feedback
    feedbacks = db.relationship('Feedback', backref='user', cascade="all, delete, delete-orphan")

    def __repr__(self):
        return f"<{self.first_name} {self.last_name} AKA {self.username}"
    
    @classmethod
    def register(cls, username, pwd, email, first_name, last_name):
        """Register user w/ hased password & return user"""

        hashed = bcrypt.generate_password_hash(pwd)
        hashed_utf8 = hashed.decode("utf8")

        return cls(username=username, password=hashed_utf8, email=email, first_name=first_name, last_name=last_name)
    
    @classmethod
    def authenticate(cls, username, pwd):
        """Validate that a user exists and the password provided is correct.

        Return user if valid; else return False.
        """

        u = User.query.filer_by(username=username).first()

        if u and bcrypt.check_password_hash(u.password, pwd):
            return u
        else:
            return False


class Feedback(db.Model):
    """Feedback model."""

    __tablename__ = "feedbacks"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String, nullable=False)
    username = db.Column(db.String(20), db.ForeignKey('users.username'), nullable=False)

