from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object('config')
CORS(app)
jwt = JWTManager(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from routes import auth, plagiarism

app.register_blueprint(auth.bp)
app.register_blueprint(plagiarism.bp)

if __name__ == '__main__':
    app.run(debug=True)