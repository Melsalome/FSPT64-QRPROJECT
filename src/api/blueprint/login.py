from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt, jwt_required, create_access_token

from api.modelUser import User, db



login_bp = Blueprint('login', __name__)


@login_bp.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    email = body["email"]
    password = body["password"]
    user = User.query.filter_by(email=email, password=password).first()
    
   
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    
    
    access_token = create_access_token(identity=user.id)

    return jsonify({ "token": access_token, "user_id": user.id })

