from flask import Flask, request, render_template, redirect, session, jsonify
from boggle import Boggle

app = Flask(__name__)
app.secret_key = 'super_secret_key_here_woo'

boggle_game = Boggle()

@app.route('/')
def home_page():
    """This will lead to the home page"""
    return render_template('home.html')

@app.route('/start', methods=['POST'])
def start_game():
    """This will initialize the game board"""
    session['board'] = boggle_game.make_board()
    session['used_words'] = []
    return redirect('/game')

@app.route('/game')
def game_board():
    """This will display the game board"""
    return render_template('game.html')

@app.route('/guess', methods=['POST'])
def handle_guess():
    """This will accept a guess and return if it's an acceptable word or not"""

    # This grabs the Word from post request data 
    data = request.json
    wordToCheck = data.get('guess')

    print(wordToCheck)
    print(f"Before check: {session['used_words']}")
    if wordToCheck not in session['used_words']:
        session['used_words'].append(wordToCheck)
        session.modified = True
        print(f"After check: {session['used_words']}")
        # This runs the word against the given check function
        outcome = boggle_game.check_valid_word(session['board'], wordToCheck)
    else:
        outcome = "already-used"
    
    print(f"After after check: {session['used_words']}")
    print(outcome)

    return jsonify({'result': outcome})

@app.route('/finished', methods=['POST'])
def handle_score_and_games_played():
    """This will check to see if the new score is greater than the hi score and increment games played by one"""
    data = request.json
    new_score = data.get('score')
    
    if 'score' not in session:
        session['score'] = 0

    if 'games_played' not in session:
        session['games_played'] = 0

    print(new_score)

    if session['score'] < new_score:
        session['score'] = new_score

    session['games_played'] += 1

    return jsonify({'games_played': session['games_played'], 'hi_score': session['score']})
