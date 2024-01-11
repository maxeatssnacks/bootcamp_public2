from flask import Flask, request, render_template
from static.stories import Story

app = Flask(__name__)

story = Story(["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}.""")

@app.route('/')
def homepage():
    return render_template("homepage.html")

@app.route('/answers')
def answers():
    return render_template("answers.html", prompts=story.prompts)

@app.route('/story')
def show_story():
    params = {key: value for key, value in request.args.items()}
    story_finished = story.generate(params)
    return render_template("story.html", story_val=story_finished)