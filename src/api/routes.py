"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import io
from flask import Flask, request, jsonify, url_for, Blueprint, send_file
from api.modelUser import db, User, Table, Restaurant, Menu
from api.utils import generate_sitemap, APIException



api = Blueprint('api', __name__)

# Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([restaurant.serialize() for restaurant in restaurants]), 200


@api.route('/restaurants', methods=['POST'])
def add_restaurant():
    data = request.json
    new_restaurant = Restaurant(
        name=data['name']
    )
    db.session.add(new_restaurant)
    db.session.commit()
    return jsonify(new_restaurant.serialize()), 201

@api.route('/restaurants/<int:restaurant_id>/tables', methods=['POST'])
def add_table(restaurant_id):
    data = request.get_json()
    new_table = Table(restaurant_id=restaurant_id, number=data['number'])
    db.session.add(new_table)
    db.session.commit()
    return jsonify(new_table.serialize()), 201

@api.route('/restaurants/<int:restaurant_id>/tables/<int:table_id>', methods=['GET'])
def get_table(restaurant_id, table_id):
    table = Table.query.filter_by(id=table_id, restaurant_id=restaurant_id).first()
    if table:
        return jsonify(table.serialize()), 200
    return jsonify({"error": "Table not found"}), 404

@api.route('/restaurants/<int:restaurant_id>/tables/<int:table_id>', methods=['PUT'])
def update_table(restaurant_id, table_id):
    data = request.get_json()
    table = Table.query.filter_by(id=table_id, restaurant_id=restaurant_id).first()
    if table:
        table.number = data['number']
        db.session.commit()
        return jsonify(table.serialize()), 200
    return jsonify({"error": "Table not found"}), 404

@api.route('/restaurants/<int:restaurant_id>/tables/<int:table_id>', methods=['DELETE'])
def delete_table(restaurant_id, table_id):
    table = Table.query.filter_by(id=table_id, restaurant_id=restaurant_id).first()
    if table:
        db.session.delete(table)
        db.session.commit()
        return jsonify({"message": "Table deleted"}), 200
    return jsonify({"error": "Table not found"}), 404
@api.route('/restaurants/<int:restaurant_id>/tables/<int:table_id>/menu', methods=['GET'])
def get_menu(restaurant_id, table_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return jsonify({"error": "Restaurant not found"}), 404

    table = Table.query.filter_by(id=table_id, restaurant_id=restaurant_id).first()
    if not table:
        return jsonify({"error": "Table not found"}), 404

    menu_items = Menu.query.filter_by(restaurant_id=restaurant_id).all()
    return jsonify([item.serialize() for item in menu_items]), 200


@api.route('/restaurants/<int:restaurant_id>/tables/<int:table_id>/menu', methods=['POST'])
def add_menu_item(restaurant_id, table_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        return jsonify({"error": "Restaurant not found"}), 404

    table = Table.query.filter_by(id=table_id, restaurant_id=restaurant_id).first()
    if not table:
        return jsonify({"error": "Table not found"}), 404

    data = request.json
    new_menu_item = Menu(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        category=data['category'],
        restaurant_id=restaurant_id
    )
    db.session.add(new_menu_item)
    db.session.commit()
    return jsonify(new_menu_item.serialize()), 201


@api.route('/restaurants/<int:restaurant_id>/tables/<int:table_id>/menu/<int:item_id>', methods=['PUT'])
def update_menu_item(restaurant_id, table_id, item_id):
    menu_item = Menu.query.filter_by(id=item_id, restaurant_id=restaurant_id).first()
    if not menu_item:
        return jsonify({"error": "Menu item not found"}), 404

    table = Table.query.filter_by(id=table_id, restaurant_id=restaurant_id).first()
    if not table:
        return jsonify({"error": "Table not found"}), 404

    data = request.json
    menu_item.name = data.get('name', menu_item.name)
    menu_item.description = data.get('description', menu_item.description)
    menu_item.price = data.get('price', menu_item.price)
    menu_item.category = data.get('category', menu_item.category)

    db.session.commit()
    return jsonify(menu_item.serialize()), 200


@api.route('/restaurants/<int:restaurant_id>/tables/<int:table_id>/menu/<int:item_id>', methods=['DELETE'])
def delete_menu_item(restaurant_id, table_id, item_id):
    menu_item = Menu.query.filter_by(id=item_id, restaurant_id=restaurant_id).first()
    if not menu_item:
        return jsonify({"error": "Menu item not found"}), 404

    table = Table.query.filter_by(id=table_id, restaurant_id=restaurant_id).first()
    if not table:
        return jsonify({"error": "Table not found"}), 404

    db.session.delete(menu_item)
    db.session.commit()
    return jsonify({"message": "Menu item deleted successfully"}), 200