from operations import add, sub, mult, div
from flask import Flask, request

app = Flask(__name__)

operators = {
        "add": add,
        "sub": sub,
        "mult": mult,
        "div": div,
        }

@app.route("/math/<operation>")
def math_operation(operation):
    """Do math on a and b query params"""
    a = int(request.args.get("a"))
    b = int(request.args.get("b"))

    return str(operators[operation](a, b))