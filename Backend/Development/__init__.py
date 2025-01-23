from flask import Flask
from flask_cors import CORS
from .routes import register_routes
import os

def create_app():
    app = Flask(__name__, static_folder=os.path.abspath('Frontend/build'))
    
    UPLOAD_FOLDER = 'uploads'
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    os.makedirs(UPLOAD_FOLDER, exist_ok=True) 
    
    CORS(app)
    register_routes(app)
        
    return app