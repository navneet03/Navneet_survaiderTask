#!/bin/bash
#!/bin/bash
virtualenv . 
source bin/activate
pip install flask==0.10.1
pip install flask_script
pip install flask_migrate
pip install flask_login
pip install flask_admin
pip install flask_restful
pip install unidecode
pip install mongoengine
pip install flask-mongoengine

