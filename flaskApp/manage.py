from inspect import getsourcefile
from os import path, sys

from flask.ext.script import Manager,Server,Shell
from flask_migrate import Migrate, MigrateCommand

current_dir = path.dirname(path.abspath(getsourcefile(lambda: 0)))
parent_dir = current_dir[:current_dir.rfind(path.sep)]
sys.path.append(parent_dir)

from flaskApp.app import app

import logging
from logging.handlers import RotatingFileHandler
file_handler = RotatingFileHandler(parent_dir+'/ServerLog/myApp.log', 'a', 1 * 1024 * 1024 * 10, 10)
file_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
app.logger.setLevel(logging.INFO)
file_handler.setLevel(logging.INFO)
app.logger.addHandler(file_handler)

manager = Manager(app)
migrate = Migrate(app)

manager.add_command("runserver",Server(host="0.0.0.0",port=5000,threaded=True))
manager.add_command("shell",Shell())
manager.add_command("db",MigrateCommand)

if __name__ == '__main__':
    manager.run()
