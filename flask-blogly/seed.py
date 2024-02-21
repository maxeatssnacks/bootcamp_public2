"""Seed file to make sample data for Users db."""

from models import User, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# Clear table if it isn't already
User.query.delete()

# Add users
alan = User(first="Alan", last="Aidan")
joel = User(first="Joel", last="Burton")
jane = User(first="Jane", last="Smith")

# Add objects to session
db.session.add(alan)
db.session.add(joel)
db.session.add(jane)

# Commit
db.session.commit()