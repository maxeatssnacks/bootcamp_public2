from unittest import TestCase

from app import app
from models import db, PostTag, Tag, User, Post

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class ViewsTestCase(TestCase):
    """Tests for views for Users"""

    def setUp(self):
        """Add sample user, post, tag, and postTag."""

        User.query.delete()
        Post.query.delete()
        Tag.query.delete()
        PostTag.query.delete()


        user = User(first="Max", last="Rautenkranz")

        db.session.add(user)
        db.session.commit()

        post = Post(title="Hi", content="Hello", user_id=user.id)

        db.session.add(post)
        db.session.commit()

        tag = Tag(name="Test")

        db.session.add(tag)
        db.session.commit()

        post_tag = PostTag(post_id=post.id, tag_id=tag.id)

        db.session.add(post_tag)
        db.session.commit()

        self.user.id = user.id
        self.post.id = post.id
        self.tag.id = tag.id

    def tearDown(self):
        """Clean up any fouled transactions"""

        db.session.rollback()

    def test_root(self):
        with app.test.client() as client:
            resp = client.get("/")

            self.assertEqual(resp.status_code, 301)

    def test_show_users(self):
        with app.test.client() as client:
            resp = client.get("/users")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Max Rautenkranz', html)        

    def test_home_page(self):
        with app.test.client() as client:
            resp = client.get("/feed")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Hi', html)

    def test_show_new_user_form(self):
        with app.test.client() as client:
            resp = client.get("/users/new")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<form action="/users/new" method="POST">', html)

    def test_create_new_user(self):
        with app.test.client() as client:
            u = {"first": "Max2", "last": "Rautenkranz2"}
            resp = client.post("/", data=u, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Max2", html)
    
    def test_show_user(self):
        with app.test.client() as client:
            resp = client.get(f"/{self.user.id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Max Rautenkranz", html)
            self.assertIn("Hi", html)
    
    def test_show_edit(self):
        with app.test.client() as client:
            resp = client.get(f"/{self.user.id}/edit")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("First Name", html)
            self.assertIn("Last Name", html)

    def test_edit_user(self):
        with app.test.client() as client:
            u = {"first": "Max3", "last": "Rautenkranz3"}
            resp = client.post(f"/users/{self.user.id}/edit", data=u, follow_redirects=True)  
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Max3", html)      
            self.assertIn("Rautenkranz3", html)
            self.assertIn("Hi", html)     

    def test_delete_user(self):
        with app.test.client() as client:
            resp = client.post(f"/users/{self.user.id}/delete", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn("Max", html)
