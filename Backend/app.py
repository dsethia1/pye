from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from pydub import AudioSegment
import subprocess
from importlib import reload

app = Flask(__name__, static_folder='build')
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True) 

@app.route('/api/upload', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No file part"}), 400

    audio_file = request.files['audio']
    
    # Save the file temporarily in .webm format
    input_path = os.path.join('uploads', 'recording.webm')
    audio_file.save(input_path)

    # Convert .webm to .wav
    output_path = os.path.join('uploads', 'recording.wav')

    try:
        # Load the .webm file and convert to .wav format
        audio_segment = AudioSegment.from_file(input_path, format='webm')
        audio_segment.export(output_path, format='wav')
        print("File uploaded and converted successfully!")
        return jsonify({"message": "File uploaded and converted successfully!"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/message')
def get_message():
    import Prediction
    Print_Pred = Prediction.print_pred
    print("sending print_pred now")
    return jsonify({"message": Print_Pred})

@app.route('/api/score')
def get_score():
    import Prediction
    Cf_score = Prediction.confidence_score_str
    print("sending confidence_score now")
    return jsonify({"message": Cf_score})

# Serve the main index.html file
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve other static files (JS, CSS, images, etc.)
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run()
