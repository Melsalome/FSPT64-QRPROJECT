"""
Punto de entrada de la aplicación
"""
import os
from flask import Flask, request, jsonify, url_for
# from flask_cors import CORS
from .utils import APIException, generate_sitemap
from .app import app
from admin import setup_admin
from commands import setup_commands

setup_admin(app)
setup_commands(app)
# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    return generate_sitemap(app)

# this only runs if `$ python src/app.py` is executed
if __name__ == '__main__':

    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
    