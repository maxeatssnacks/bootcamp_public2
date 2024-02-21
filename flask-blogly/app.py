"""Blogly application."""

import os
from flask import Flask, request, render_template, redirect, flash, session, url_for
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

# This is Server-Side Versioning which allows us to load a "new" CSS file everytime we refresh, bypassing caching issues
@app.template_filter('versioned')
def versioned_static_file(filename):
    file_path = os.path.join(app.root_path, app.static_folder, filename)
    try:
        timestamp = os.path.getmtime(file_path)
    except OSError:
        timestamp = 'missing'
    new_filename = f"{filename}?v={timestamp}"
    return url_for('static', filename=new_filename, _external=True, _scheme='')

@app.route("/")
def homepage():
    """Redirects to /users"""
    return redirect("/users")

@app.route("/users")
def show_users():
    """Shows all users"""
    users = User.query.all()
    return render_template('users.html', users=users)

@app.route("/users/new")
def show_new_user_form():
    """Brings us to new user form"""
    return render_template('new.html')

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
    return render_template('detail.html', user=user)

@app.route("/users/<int:user_id>/edit")
def show_edit(user_id):
    """This brings us to the edit user form"""
    user = User.query.get_or_404(user_id)
    return render_template('edit.html', user=user)

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