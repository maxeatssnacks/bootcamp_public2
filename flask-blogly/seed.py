"""Seed file to make sample data for Users db."""

from models import User, Post, Tag, PostTag, db
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

# Clear table if it isn't already
Post.query.delete()

# Create posts
post1 = Post(title="This is a post", content="This is where I'd put my content if I had any.", user_id=alan.id, created_at="2024-02-24 13:40:15.963170")
post2 = Post(title="This is also post", content="This is where I'd put my content if I had any.", user_id=alan.id, created_at="2024-02-24 13:40:15.963170")
post3 = Post(title="This is not a post", content="This is where I'd put my content if I had any.", user_id=alan.id, created_at="2024-02-24 13:40:15.963170")
post4 = Post(title="Wow a post", content="This is where I'd put my content if I had any.", user_id=joel.id, created_at="2024-02-24 13:40:15.963170")
post5 = Post(title="More posts please", content="This is where I'd put my content if I had any.", user_id=joel.id, created_at="2024-02-24 13:40:15.963170")
post6 = Post(title="Aaaah I'm posting", content="This is where I'd put my content if I had any.", user_id=jane.id, created_at="2024-02-24 13:40:15.963170")

# Add objects to session
db.session.add(post1)
db.session.add(post2)
db.session.add(post3)
db.session.add(post4)
db.session.add(post5)
db.session.add(post6)

# Commit
db.session.commit()

# Create tags
tag1 = Tag(name="Meme")
tag2 = Tag(name="NSFW")
tag3 = Tag(name="Dog")

# Add objects to session
db.session.add(tag1)
db.session.add(tag2)
db.session.add(tag3)

# Commit
db.session.commit()

# Create PostTags
postTag1 = PostTag(post_id=post1.id, tag_id=tag1.id)
postTag2 = PostTag(post_id=post1.id, tag_id=tag3.id)
postTag3 = PostTag(post_id=post2.id, tag_id=tag2.id)
postTag4 = PostTag(post_id=post3.id, tag_id=tag1.id)
postTag5 = PostTag(post_id=post4.id, tag_id=tag1.id)
postTag6 = PostTag(post_id=post5.id, tag_id=tag1.id)
postTag7 = PostTag(post_id=post6.id, tag_id=tag1.id)
postTag8 = PostTag(post_id=post5.id, tag_id=tag2.id)
postTag9 = PostTag(post_id=post6.id, tag_id=tag3.id)

# Add objects to session
db.session.add(postTag1)
db.session.add(postTag2)
db.session.add(postTag3)
db.session.add(postTag4)
db.session.add(postTag5)
db.session.add(postTag6)
db.session.add(postTag7)
db.session.add(postTag8)
db.session.add(postTag9)

# Commit
db.session.commit()