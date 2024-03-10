"""Flask app for Cupcakes"""

from flask import Flask, jsonify, request, render_template, redirect, session
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'our-little-secret'

connect_db(app)
db.create_all()

@app.route('/')
def show_homepage():
    cupcakes = Cupcake.query.all()
    
    return render_template('home.html', cupcakes=cupcakes)


@app.route('/api/cupcakes')
def get_cupcakes():

    all_cupcakes = {"cupcakes":[cupcake.serialize_cupcake() for cupcake in Cupcake.query.all()]}
    return jsonify(all_cupcakes)

@app.route('/api/cupcakes/<int:cupcake_id>')
def get_specific_cupcake(cupcake_id):

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.serialize_cupcake())

@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json.get("image", "https://tinyurl.com/demo-cupcake")

    cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(cupcake)
    db.session.commit()

    return (jsonify(cupcake=cupcake.serialize_cupcake()), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=["PATCH"])
def update_cupcake(cupcake_id):

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json.get('flavor', cupcake.flavor)
    cupcake.size = request.json.get('size', cupcake.size)
    cupcake.rating = request.json.get('rating', cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)

    db.session.commit()

    return jsonify(cupcake=cupcake.serialize_cupcake())

@app.route('/api/cupcakes/<int:cupcake_id>', methods=["DELETE"])
def delete_cupcake(cupcake_id):

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="Deleted")