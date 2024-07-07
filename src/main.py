"""
Punto de entrada de la aplicación
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
# from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from app import app
from api.admin import setup_admin
from api.commands import setup_commands

# ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
# static_file_dir = os.path.join(os.path.dirname(
#     os.path.realpath(__file__)), '../public/')
# app = Flask(__name__)
# app.url_map.strict_slashes = False

setup_admin(app)
setup_commands(app)
from api.blueprints.table import table_bp
from api.blueprints.product import product_bp
from api.blueprints.client import client_bp
from api.blueprints.productTable import productTable_bp
from api.blueprints.sessions import sessions_bp
from api.blueprints.auth import auth_bp
from api.blueprints.restaurants import restaurants_bp
from api.blueprints.generateqr import generateqr_bp
app.register_blueprint(table_bp, url_prefix='/app')
app.register_blueprint(product_bp, url_prefix='/app')
app.register_blueprint(client_bp, url_prefix='/app')
app.register_blueprint(productTable_bp, url_prefix='/app')
app.register_blueprint(sessions_bp, url_prefix='/app')
app.register_blueprint(auth_bp, url_prefix='/app')
app.register_blueprint(restaurants_bp, url_prefix='/app')
app.register_blueprint(generateqr_bp, url_prefix='/app')
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
    