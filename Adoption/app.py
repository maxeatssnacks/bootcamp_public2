"""Adoption Agency application."""

from flask import Flask, request, render_template, redirect, flash, session
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption_agency'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'our-little-secret'

connect_db(app)

@app.route("/")
def redirect_root():
    """This redirects you to the adoption homepage"""
    return redirect("/adoption-page")

@app.route("/adoption-page")
def show_homepage():
    """This shows you the adoption homepage"""

    pets_for_adoption = Pet.query.filter_by(available=True).all()

    return render_template("adoption_page.html", pets=pets_for_adoption)

@app.route("/add", methods=["GET", "POST"])
def add_pet_form():
    """This will handle showing and receiving of pet form"""
    
    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        available = form.available.data
        
        pet_to_add = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes, available=available)
        db.session.add(pet_to_add)
        db.session.commit()

        flash(f"Added {name} to adoption page!")
        return redirect('/')
    
    else:
        return render_template("add_form.html", form=form)
    
@app.route("/pets/<int:pet_id>", methods=["GET", "POST"])
def edit_pet_form(pet_id):
    """This will handle showing and receiving of pet form"""
    

    pet_to_update = Pet.query.filter_by(id=pet_id).first()
    form = EditPetForm()

    if form.validate_on_submit():
        photo_url = form.photo_url.data
        notes = form.notes.data
        available = form.available.data
        
        pet_to_update.photo_url = photo_url
        pet_to_update.notes = notes
        pet_to_update = available

        db.session.commit()

        # flash(f"Updated {pet_to_update.name}'s information!")
        return redirect(f'/pets/{pet_id}')
    
    else:
        return render_template("pet_info.html", form=form, pet=pet_to_update)
