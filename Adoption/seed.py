"""Seed file to make sample data for Users db."""

from models import db
from app import app, Pet

# Create all tables
db.drop_all()
db.create_all()

# Clear table if it isn't already
Pet.query.delete()

# Add pets
lucy = Pet(name="Lucy Coyle", species="dog", age=4, notes="My nickname is goose, but I'm a dog!")
sam = Pet(name="Sam Lasso", species="fish", age=1, notes="Be a goldfish.")
donald = Pet(name="Donald Duck", species="Duck", photo_url="https://upload.wikimedia.org/wikipedia/en/a/a5/Donald_Duck_angry_transparent_background.png", age=10, notes="He is a duck!")

# Add to session
db.session.add(lucy)
db.session.add(sam)
db.session.add(donald)

# Committ
db.session.commit()