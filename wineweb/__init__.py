from flask import Flask
from wineweb.config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Dynamically configure Flask-Mail with settings from the database
    

    # Register Blueprints

    from wineweb.main.routes import main
    app.register_blueprint(main)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
