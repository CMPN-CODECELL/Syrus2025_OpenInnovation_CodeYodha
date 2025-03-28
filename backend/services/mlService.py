import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

class CropSuitabilityModel:
    def __init__(self):
        self.model = RandomForestRegressor()
        self.scaler = StandardScaler()

    def prepare_data(self, soil_data, weather_data):
        # Combine and preprocess features
        features = pd.concat([soil_data, weather_data], axis=1)
        return features

    def train_model(self, X, y):
        X_scaled = self.scaler.fit_transform(X)
        X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2)
        
        self.model.fit(X_train, y_train)
        score = self.model.score(X_test, y_test)
        return score

    def predict_suitability(self, input_data):
        input_scaled = self.scaler.transform(input_data)
        return self.model.predict(input_scaled)