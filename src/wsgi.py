# # This file was created to run the application on heroku using gunicorn.
# # Read more about it here: https://devcenter.heroku.com/articles/python-gunicorn

# import os
# import sys

# from src.app import app as application

# sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src/app'))


# if __name__ == "__main__":
#     application.run()

import os
import sys


sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from app import create_app

application = create_app()

if __name__ == "__main__":
    application.run()