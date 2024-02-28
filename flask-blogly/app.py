"""Blogly application."""

from flask import Flask, request, render_template, redirect, flash, session
from models import db, connect_db, User, Post, Tag, PostTag
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'our-little-secret'

connect_db(app)
db.create_all()

@app.route("/")
def root():
    """Redirects to /users"""
    return redirect("/feed")

@app.route("/feed")
def home_page():

    posts = Post.query.order_by(db.desc(Post.id)).limit(5).all()
    

    return render_template('feed.html', feed=posts)

@app.route("/users")
def show_users():
    """Shows all users"""
    users = User.query.all()
    return render_template('users.html', users=users)

@app.route("/users/new")
def show_new_user_form():
    """Brings us to new user form"""
    return render_template('newUserForm.html')

@app.route("/users/new", methods=["POST"])
def create_new_user():
    """This handles the creation of a new user"""
    first = request.form['first']
    last = request.form['last']
    url = request.form.get('image', "")

    user = User(first=first, last=last, imageURL=url)
    db.session.add(user)
    db.session.commit()
    return redirect(f"/users")

@app.route("/users/<int:user_id>")
def show_user(user_id):
    """This shows the details of a specific user"""
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user_id=user_id).all()
    return render_template('userDetail.html', user=user, posts=posts)

@app.route("/users/<int:user_id>/edit")
def show_edit(user_id):
    """This brings us to the edit user form"""
    user = User.query.get_or_404(user_id)
    return render_template('editUser.html', user=user)

@app.route("/users/<int:user_id>/edit", methods=["POST"])
def edit_user(user_id):
    """This will change an exisiting users data"""
    
    first = request.form.get('first', '')
    last = request.form.get('last', '')
    url = request.form.get('image', '')

    edited = User.query.filter_by(id=user_id).first()
    edited.first = first
    edited.last = last
    edited.imageURL = url

    db.session.add(edited)
    db.session.commit()
    return redirect(f"/users/{edited.id}")

@app.route("/users/<int:user_id>/delete", methods=["POST"])
def delete_user(user_id):
    """This will delete an existing user's data"""

    # Get the first record by user_id and delete it
    user_to_delete = User.query.filter_by(id=user_id).first()
    if user_to_delete:
        db.session.delete(user_to_delete)
        db.session.commit()
        return redirect("/users")
    else:
        # Handle the scenario if the user is not found
        return "User not found", 404
    
@app.route("/users/<int:user_id>/posts/new")
def new_post_form(user_id):
    """This will bring you to the new post form"""

    user = User.query.filter_by(id=user_id).first()
    tags = Tag.query.all()

    return render_template('newPostForm.html', user=user, tags=tags)

@app.route("/users/<int:user_id>/posts/new", methods=["POST"])
def add_new_post(user_id):
    """This will bring you to the new post form"""

    title = request.form.get('title', '')
    content = request.form.get('content', '')
    
    # This allows us to get multiple values from a form 
    tags = request.form.getlist('tags')

    user = User.query.filter_by(id=user_id).first()

    new_post = Post(title=title, content=content, user_id=user.id)

    # need to commit the new post so we can make the relationship
    db.session.add(new_post)
    db.session.commit()

    # searches for tag_name string in tags and associates post_id to tag_id
    for tag_name in tags:
        tag = Tag.query.filter_by(name=tag_name).first()
        PostTag_to_add = PostTag(post_id=new_post.id, tag_id=tag.id)
        db.session.add(PostTag_to_add)
    
    # can commit after running thru the for loop for performance improvement
    db.session.commit()
    
    return redirect(f"/users/{user_id}")

@app.route("/posts/<int:post_id>")
def show_post(post_id):
    """This will show you a specific post"""

    post = Post.query.filter_by(id=post_id).first()

    # This turns the post.created_at into a friendly to read datetime string
    datetime_obj = datetime.strptime(str(post.created_at), "%Y-%m-%d %H:%M:%S.%f")
    friendly_datetime_str = datetime_obj.strftime("%B %d, %Y at %I:%M %p")


    # posts = Post.query.join(PostTag, Post.id == PostTag.post_id)\
    #               .filter(PostTag.tag_id == tag_id)\
    #               .all()
    
    tags = Tag.query.join(PostTag, Tag.id == PostTag.tag_id)\
                .filter(PostTag.post_id == post_id)\
                .all()


    return render_template('post.html', post=post, date=friendly_datetime_str, tags=tags)

@app.route("/posts/<int:post_id>/edit")
def edit_post_form(post_id):
    """This will bring you to a form to edit a post"""

    post = Post.query.filter_by(id=post_id).first()
    tags = Tag.query.all()
    checked_tags = Tag.query.join(PostTag, Tag.id == PostTag.tag_id)\
                .filter(PostTag.post_id == post_id)\
                .all()
    
    return render_template('editPost.html', post=post, tags=tags, checked=checked_tags)


@app.route("/posts/<int:post_id>/edit", methods=["POST"])
def edit_post(post_id):
    """This will edit a post"""

    title = request.form.get('title', '')
    content = request.form.get('content', '')
    tags = request.form.getlist('tags')


    post_to_update = Post.query.filter_by(id=post_id).first()
    
    for tag_name in tags:
        tag = Tag.query.filter_by(name=tag_name).first()
        PostTag_to_add = PostTag(post_id=post_to_update.id, tag_id=tag.id)
        db.session.add(PostTag_to_add)
    
    post_to_update.title = title
    post_to_update.content = content
    
    db.session.add(post_to_update)
    db.session.commit()

    return redirect (f"/posts/{post_id}")
        
@app.route("/posts/<int:post_id>/delete", methods=["POST"])
def delete_post(post_id):
    """This will delete a post"""

    post_to_delete = Post.query.filter_by(id=post_id).first()
    if post_to_delete:
        db.session.delete(post_to_delete)
        db.session.commit()
        return redirect (f"/users/{post_to_delete.user_id}")
    else:
        # Handle the scenario if the user is not found
        return "Post not found", 404
    
@app.route("/tags")
def show_tags():
    """This will show all tags"""

    tags = Tag.query.all()
    return render_template('tags.html', tags=tags)

@app.route("/tags/<int:tag_id>")
def show_specific_tag(tag_id):
    """This will show the posts with a specific tag"""

    posts = Post.query.join(PostTag, Post.id == PostTag.post_id)\
                  .filter(PostTag.tag_id == tag_id)\
                  .all()
    
    tag = Tag.query.filter_by(id=tag_id).first()

    return render_template('tagDetail.html', posts=posts, tag=tag)

@app.route("/tags/new")
def show_new_tags_form():
    """This will show the new tag form"""

    return render_template('newTagForm.html')

@app.route("/tags/new", methods=["POST"])
def create_new_tag():
    """This will show the new tag form"""

    name = request.form.get('name', '')

    try:
        tag = Tag(name=name)
        if tag:
            db.session.add(tag)
            db.session.commit()
            return redirect("/tags")
    except:
        flash("This tag already exists!")
        return render_template('newTagForm.html')
    
@app.route("/tags/<int:tag_id>/edit")
def show_edit_tag_form(tag_id):
    """This will show a form to edit existing tag"""

    tag = Tag.query.filter_by(id=tag_id).first()

    return render_template('editTag.html', tag=tag)

@app.route("/tags/<int:tag_id>/edit", methods=["POST"])
def edit_tag(tag_id):
    """This will edit an existing tag"""

    name = request.form.get('name', '')

    try:
        tag_to_update = Tag.query.filter_by(id=tag_id).first()
    
        tag_to_update.name = name
        db.session.add(tag_to_update)
        db.session.commit()

        return redirect(f"/tags/{tag_id}")

    except:
        flash("There was an error finding that tag, try again!")
        return redirect("/tags")



@app.route("/tags/<int:tag_id>/delete")
def delete_tag(tag_id):
    """This will delete an existing tag"""

    try:
        tag_to_delete = Tag.query.filter_by(id=tag_id).first()
        db.session.delete(tag_to_delete)
        db.session.commit()
        flash("Tag successfully deleted!")
        return redirect("/tags")
    
    except:
        flash("There was an error finding that tag, try again!")
        return redirect("/tags")