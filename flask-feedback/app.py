"""Flask app for Feedback"""

from flask import Flask, jsonify, request, render_template, redirect, session, flash
from forms import RegistrationForm, LoginForm, FeedbackForm
from models import db, connect_db, User, Feedback

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'our-little-secret'

connect_db(app)
db.create_all()

@app.route('/')
def redirect_to_register():
    """This redirects root to /register"""
    return redirect('/register')

@app.route('/register', methods=["GET", "POST"])
def handle_registration_form():
    """This shows the form to register"""

    form = RegistrationForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        newUser = User.register(username=username, pwd=password, email=email, first_name=first_name, last_name=last_name)
        db.session.add(newUser)
        db.session.commit()
        session["username"] = newUser.username
        return redirect("/secret")

    return render_template('register.html', form=form)

@app.route('/login', methods=["GET", "POST"])
def handle_login_form():
    """This shows the form to register"""

    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username=username, pwd=password)
        if user:
            session["username"] = user.username
            flash("Succesfully logged in!", 'message')
            return redirect("/secret")
        else:
            form.username.errors = ["Bad name/password"]

    return render_template("login.html", form=form)


@app.route('/secret')
def secret_landing_page():
    """This will bring you to the secret page, if you're allowed..."""

    if "username" not in session:
        flash("You must be logged in to view!", 'error')
        return redirect("/login")
    else:
        return redirect(f"/users/{session['username']}")

@app.route('/users/<username>')
def handle_users_page(username):
    """This shows logged in users page"""

    if session["username"] == username:
        user_info = User.query.filter_by(username=username).first()
        user_info.password = "LOLYouWish"
        feedback = Feedback.query.filter_by(username=username).all()
        return render_template('users_page.html', info=user_info, feedback=feedback)
    else:
        return redirect(f"/users/{session['username']}")

@app.route('/logout')
def logout_user():
    """This will clear your session and log you out"""

    session.pop("username")
    flash("You've been logged out.", 'info')
    return redirect('/')

@app.route("/users/<username>/delete", methods=["POST"])
def delete_user(username):
    """This will delete a user, only if that user is currently logged in"""

    if "username" in session:
        if session["username"] == username:
            user_to_delete = User.query.filter_by(username=username).first()
            db.session.delete(user_to_delete)
            db.session.commit()
            flash(f"You have deleted {username}", 'info')
            return redirect('/logout')
        else:
            return redirect(f"/users/{session['username']}")
    else:
        return redirect('/')
    
@app.route("/users/<username>/feedback/add", methods=["GET", "POST"])
def handle_adding_feedback(username):
    """This will show a form to add feedback for specific user"""

    form = FeedbackForm()

    if "username" in session:
        if session["username"] == username:
            if form.validate_on_submit():
                title = form.title.data
                content = form.content.data
                feedback = Feedback(title=title, content=content, username=username)
                db.session.add(feedback)
                db.session.commit()
                flash("Feedback added!")
                return redirect(f'/users/{username}')
        else:
            return redirect(f"/users/{session['username']}")
    return render_template('feedback_form.html', form=form)

@app.route("/feedback/<int:feedback_id>/update", methods=["GET", "POST"])
def handle_updating_feedback(feedback_id):
    """Handle showing update form and updating the feedback."""

    # Early return if the user is not logged in
    if "username" not in session:
        flash("You need to be logged in to edit feedback.", "error")
        return redirect("/login")  # Assuming you have a 'login' view function

    # Check if the feedback exists and belongs to the logged-in user
    feedback = Feedback.query.filter_by(id=feedback_id).first()
    print(feedback)
    print(feedback.title)
    print(feedback.content)
    if session["username"] != feedback.username:
        flash("You do not have permission to edit this feedback.", "error")
        return redirect(f"users/{session['username']}")  # Assuming you have an 'index' or home view function


    form = FeedbackForm()
    form.title.data = feedback.title
    form.content.data = feedback.content
        
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        flash("Feedback updated!")
        return redirect(f"/users/{session['username']}")

    print(f"Title on GET: {form.title.data}")
    print(f"Content on GET: {form.content.data}")
    return render_template('update_feedback.html', form=form, feedback=feedback)

@app.route("/feedback/<int:feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):
    """This will delete feedback id if the feedback is related to logged in user"""

    if "username" in session:
        feedback = Feedback.query.filter_by(id=feedback_id).first()
        if session["username"] == feedback.username:
            db.session.delete(feedback)
            db.session.commit()
            flash("You just deleted some feedback")
    
        return redirect(f"/users/{session['username']}")

    return redirect('/')