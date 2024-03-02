from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FileField
from wtforms.validators import InputRequired, Optional, NumberRange, URL, AnyOf
from wtforms import validators

class AddPetForm(FlaskForm):
    """Form for adding pets to adopt"""

    name = StringField("Pet Name", validators=[InputRequired()])
    species = StringField("Species", validators=[InputRequired(), AnyOf("dog", "cat", "porcupine")])
    photo_url = StringField("Pet Photo URL", validators=[Optional(), URL()])
    age = IntegerField("Age", validators=[Optional(), NumberRange(min=0, max=30)])
    notes = StringField("Notes", validators=[Optional()])
    available = BooleanField("Available", default=True, validators=[InputRequired()])


class EditPetForm(FlaskForm):
    """Form for editing pets"""

    photo_url = StringField("Pet Photo URL", validators=[Optional(), URL()])
    notes = StringField("Notes", validators=[Optional()])
    available = BooleanField("Available", default=True, validators=[InputRequired()])
