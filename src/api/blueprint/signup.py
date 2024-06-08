from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt, jwt_required, create_access_token

from api.modelUser import User, db


signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup', methods=['POST'])
def handle_signup():
    data = request.get_json()

   
    if User.query.filter_by(email = data["Email"]).first():
        return jsonify('User already exist')
    new_user = User(
    first_name=data['First Name'],
    last_name=data['Last Name'],
    name_of_the_restaurant=data['Name of the restaurant'],
    email=data['Email'],
    password=data['Password'],
    is_active=True)
    db.session.add(new_user)
    db.session.commit()    
    
    
    return jsonify({ "user": new_user.serialize() })


