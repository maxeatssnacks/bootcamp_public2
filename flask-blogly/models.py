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
    imageURL = db.Column(db.String, default="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=1380")

    def full_name(self):
        """Return the full name of the user."""
        return f"{self.first} {self.last}"
    
class Post(db.Model):
    """Post."""

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', backref=db.backref("posts", cascade="all, delete-orphan"))
    tags = db.relationship('Tag', secondary='postTags', backref=db.backref('posts'))


class Tag(db.Model):
    """Tag."""

    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, unique=True)


class PostTag(db.Model):
    """Post + Tag."""

    __tablename__ = "postTags"

    post_id = db.Column(db.Integer, db.ForeignKey(Post.id), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey(Tag.id), primary_key=True)
