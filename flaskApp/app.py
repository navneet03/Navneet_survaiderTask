from flask import Flask, render_template
from flask_login import LoginManager
from flask.ext.mongoengine import MongoEngine
import os,ast
from inspect import getsourcefile
from os import path, sys

from config import configuration

app = Flask(__name__)
login_manager = LoginManager(app)
app.config.from_object(configuration)

current_dir = path.dirname(path.abspath(getsourcefile(lambda:0)))
f = open(current_dir+"/../properties/flask_database.txt", 'r')
a = ast.literal_eval(f.read())
f.close()

app.config['MONGODB_SETTINGS'] = {
    'db': a['DatabaseName'],
    'host': a['host'],
    'port': int(a['port'])
}
db = MongoEngine(app)

from flaskApp.reviewRestApi import review_api
app.register_blueprint(review_api,url_prefix="/review_api")


@app.route('/')
def hello():
    return  render_template('index.html')


@app.route('/reviews_analysis')
def reviews_analysis():
    return render_template('reviews.html')


@app.before_request
def _before_request():
    pass
    # print request.url
    # app.logger.info('request_data: '+request.data+' address: '+str(request.access_route)+' url:'+str(request.url_rule))


@app.after_request
def after(response):
    return response


@app.errorhandler(500)
def internal_error(exception):
    return '500 error'




