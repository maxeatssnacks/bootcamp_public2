from flask import Flask

app = Flask(__name__)

@app.route('/welcome')
def welcome():
    """Return simple "Welcome" Greeting."""
    
    return "<h1>welcome</h1>"

@app.route('/welcome/home')
def welcome_home():
    """Return simple "Welcome Home" Greeting."""
    
    return "<h1>welcome home</h1>"

@app.route('/welcome/back')
def welcome_back():
    """Return simple "Welcome Back" Greeting."""
    
    return "<h1>welcome back</h1>"