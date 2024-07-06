
import os
from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager

import base64
import json

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['ENV'] = os.getenv('FLASK_ENV')
app.config['PORT'] = 3001

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app)


# Importar los modelos para que Alembic pueda detectarlos
from models import Table, Product, ProductTable, Client, Invoice, TableSession, Restaurant, Order, OrderItem

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
