import pandas as pd
import numpy as np
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS before defining routes

# Load trained model
try:
    model = joblib.load("crop_recommendation.pkl")
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
    
    try:
        data = request.get_json()
        required_keys = ["N", "P", "K", "temperature", "humidity", "pH", "rainfall"]
        
        # Check if all keys are present
        if not all(key in data for key in required_keys):
            return jsonify({"error": "Missing parameters"}), 400
        
        # Convert input to NumPy array
        features = np.array([data["N"], data["P"], data["K"], data["temperature"],
                             data["humidity"], data["pH"], data["rainfall"]]).reshape(1, -1)

        # Make prediction
        prediction = model.predict(features)[0]
        return jsonify({"recommended_crop": prediction})

    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
