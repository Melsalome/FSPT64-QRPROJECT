# This file was created to run the application on heroku using gunicorn.
# Read more about it here: https://devcenter.heroku.com/articles/python-gunicorn
from app import app

if __name__ == "__main__":
    app.run()
