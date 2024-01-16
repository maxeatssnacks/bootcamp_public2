from flask import Flask, request, render_template, redirect, flash
from static.surveys import satisfaction_survey

app = Flask(__name__)
app.secret_key = 'super_secret_key_here_woo'

responses = []
QUESTIONS = satisfaction_survey.questions

@app.route('/')
def home_page():
    """"""
    return render_template('root.html')

@app.route('/questions/<int:number>')
def question(number):
    """"""

    if number != len(responses):
        flash("Please don't try to skip questions or change your answers!")
        return redirect('/questions/{}'.format(len(responses)))

    QUESTION = QUESTIONS[number]

    return render_template('questions.html', question=QUESTION, number=number)

@app.route('/answer', methods=["POST"])
def answer():
    """"""

    selected_answer = request.form["answer"]
    responses.append(selected_answer)
    number = int(request.form["number"])

    if number + 1 < len(QUESTIONS):
        number = number + 1
        return redirect('/questions/{}'.format(number))
    else:
        return redirect('/finished')
    
@app.route('/finished')
def finished():
    """"""
    return render_template('finished.html', answers=responses)