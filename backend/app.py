import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS with security

# Load the trained models and scalers
crop_model = joblib.load("crop_recommendation_model.pkl")
crop_scaler = joblib.load("crop_scaler.pkl")

price_model = joblib.load("crop_price_model.pkl")
price_scaler = joblib.load("price_scaler.pkl")
label_enc_crop = joblib.load("crop_label_encoder.pkl")
label_enc_state = joblib.load("state_label_encoder.pkl")

@app.route("/predict_crop", methods=["POST"])
def predict_crop():
    try:
        data = request.json
        print("Received Data:", data)  # Debugging print
        
        # Feature mapping (frontend -> model trained feature names)
        feature_mapping = {
            "nitrogen": "N",
            "phosphorus": "P",
            "potassium": "K",
            "temperature": "temperature",
            "humidity": "humidity",
            "ph": "ph",
            "rainfall": "rainfall"
        }
        
        # Convert input data to expected format
        mapped_data = {feature_mapping[key]: value for key, value in data.items() if key in feature_mapping}
        
        # Ensure all required features are present
        feature_names = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        features_df = pd.DataFrame([mapped_data], columns=feature_names)
        
        # Apply scaling
        features_scaled = crop_scaler.transform(features_df)
        
        # Predict the crop
        prediction = crop_model.predict(features_scaled)[0]
        print("Predicted Crop:", prediction)  # Debugging print
        
        return jsonify({"crop": prediction})
    
    except Exception as e:
        print("Error:", str(e))  # Debugging
        return jsonify({"error": str(e)}), 500

@app.route("/predict_price", methods=["POST"])
def predict_price():
    try:
        data = request.json
        print("Received Data:", data)  # Debugging print
        
        # Extract input values
        features = ["N_SOIL", "P_SOIL", "K_SOIL", "TEMPERATURE", "HUMIDITY", "ph", "RAINFALL", "CROP", "STATE"]
        user_input = [data[feature] for feature in features[:-2]]
        
        # Encode categorical inputs
        user_input.append(label_enc_crop.transform([data["CROP"]])[0])
        user_input.append(label_enc_state.transform([data["STATE"]])[0])
        
        # Convert input into DataFrame
        input_df = pd.DataFrame([user_input], columns=features)
        
        # Scale input features
        input_scaled = price_scaler.transform(input_df)
        
        # Predict Crop Price
        predicted_price = price_model.predict(input_scaled)[0]
        print("Predicted Crop Price:", predicted_price)  # Debugging print
        
        return jsonify({"predicted_price": round(predicted_price, 2)})
    
    except Exception as e:
        print("Error:", str(e))  # Debugging
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)