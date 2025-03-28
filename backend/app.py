import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and scaler
model = joblib.load("crop_recommendation_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        print("Received Data:", data)  # Debugging print

        # Correct feature mapping (frontend -> model trained feature names)
        feature_mapping = {
            "nitrogen": "N",
            "phosphorus": "P",
            "potassium": "K",
            "temperature": "temperature",
            "humidity": "humidity",
            "ph": "ph",
            "rainfall": "rainfall"
        }

        # Convert input data to the expected format
        mapped_data = {feature_mapping[key]: value for key, value in data.items() if key in feature_mapping}

        # Ensure all required features are present
        feature_names = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        features_df = pd.DataFrame([mapped_data], columns=feature_names)

        # Apply scaling
        features_scaled = scaler.transform(features_df)

        # Predict the crop
        prediction = model.predict(features_scaled)[0]
        print("Predicted Crop:", prediction)  # Debugging print

        return jsonify({"crop": prediction})

    except Exception as e:
        print("Error:", str(e))  # Print error to debug
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)