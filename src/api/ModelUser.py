
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    name_of_the_restaurant = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "first name": self.first_name,
            "last name": self.last_name,
            "name of the restaurant": self.name_of_the_restaurant,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    


class Usuario(db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }


class Restaurant(db.Model):
    __tablename__ = 'restaurant'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(255), nullable=True)
    menus = db.relationship('Menu', backref='restaurant', lazy=True)

    def __repr__(self):
        return f'<Restaurant {self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image
        }

class Table(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    number = db.Column(db.String(50), nullable=False)

    restaurant = db.relationship('Restaurant', backref=db.backref('tables', lazy=True))

    def serialize(self):
        return {
            "id": self.id,
            "restaurant_id": self.restaurant_id,
            "number": self.number
        }        
class Menu(db.Model):
    __tablename__ = 'menu'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(255), nullable=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)

    def __repr__(self):
        return f'<Menu {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "category": self.category,
            "image": self.image,
            "restaurant_id": self.restaurant_id
        }

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, nullable=False)
    table_id = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255), nullable=True)
    payment_method = db.Column(db.String(50), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    order_items = db.relationship('OrderItem', backref='order', lazy=True)
    invoice = db.relationship('Invoice', back_populates='order', uselist=False)
    
    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "restaurant_id": self.restaurant_id,
            "table_id": self.table_id,
            "comment": self.comment,
            "payment_method": self.payment_method,
            "total_price": self.total_price,
            "order_items": [item.serialize() for item in self.order_items]
        }

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    menu_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)


    def __repr__(self):
        return f'<OrderItem {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "order_id": self.order_id,
            "menu_id": self.menu_id,
            "name": self.name,
            "quantity": self.quantity,
            "price": self.price,
          
        }

class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    table_id = db.Column(db.Integer, db.ForeignKey('table.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    order = db.relationship('Order', back_populates='invoice')
    def to_dict(self):
      
        return {
            'id': self.id,
            'table_id': self.table.id,
            'restaurant_id': self.restaurant.id,
            'total_price': self.total_price,
        }