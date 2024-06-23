from flask import Flask
from flask_cors import CORS
from extensions import db
from routes import task_bp  # Use absolute import

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    CORS(app)

    with app.app_context():
        app.register_blueprint(task_bp, url_prefix='/api')
        db.create_all()

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
