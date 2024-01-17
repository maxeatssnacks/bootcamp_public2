from flask import Flask, request, render_template, redirect, flash, session, make_response
from static.surveys import satisfaction_survey

app = Flask(__name__)
app.secret_key = 'super_secret_key_here_woo'

QUESTIONS = satisfaction_survey.questions

@app.route('/')
def home_page():
    """"""
    return render_template('root.html')

@app.route('/start', methods=["POST"])
def start_survey():
    """"""
    session['responses'] = []
    return redirect('/questions/0')

@app.route('/questions/<int:number>')
def question(number):
    """"""

    if number != len(session['responses']):
        flash("Please don't try to skip questions or change your answers!")
        return redirect('/questions/{}'.format(len(session['responses'])))
    
    QUESTION = QUESTIONS[number]

    return render_template('questions.html', question=QUESTION, number=number)

@app.route('/answer', methods=["POST"])
def answer():
    """"""

    responses = session['responses']
    responses.append(request.form["answer"])
    session['responses'] = responses

    number = int(request.form["number"])

    if number + 1 < len(QUESTIONS):
        number = number + 1
        return redirect('/questions/{}'.format(number))
    else:
        return redirect('/finished')
    
@app.route('/finished')
def finished():
    """"""
    return render_template('finished.html')