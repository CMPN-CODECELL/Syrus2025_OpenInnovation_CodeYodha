import pandas as pd
import numpy as np
import os
import zipfile
import joblib
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

import kagglehub

# Download dataset from Kaggle
path = kagglehub.dataset_download("atharvaingle/crop-recommendation-dataset")

print("📂 Path to dataset files:", path)

# Extract dataset if it's a ZIP file
dataset_path = path
zip_files = [f for f in os.listdir(dataset_path) if f.endswith('.zip')]

for zip_file in zip_files:
    with zipfile.ZipFile(os.path.join(dataset_path, zip_file), 'r') as zip_ref:
        zip_ref.extractall(dataset_path)

print("📂 Extracted files:", os.listdir(dataset_path))

# Load dataset
csv_file = os.path.join(path, "Crop_recommendation.csv")  
df = pd.read_csv(csv_file)

# Display first few rows
print("📊 Dataset Sample:")
print(df.head())

# Display dataset information
print("\nℹ️ Dataset Information:")
print(df.info())

# Check for missing values
print("\n🔍 Missing Values:")
print(df.isnull().sum())

# Split dataset into features (X) and target (y)
X = df.iloc[:, :-1]
y = df.iloc[:, -1]

print("\n🌾 Unique Crops:", y.unique())

# Standardize the feature values
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Save the scaler for future use
joblib.dump(scaler, "crop_scaler.pkl")
print("✅ Scaler saved as scaler.pkl")

# Split data into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train a RandomForest Classifier
print("\n⏳ Training Random Forest model...")
rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
rf_classifier.fit(X_train, y_train)

# Save the trained model
joblib.dump(rf_classifier, "crop_recommendation_model.pkl")
print("✅ Model saved as crop_recommendation_model.pkl")

# Evaluate model performance
y_pred = rf_classifier.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"\n✅ Model Accuracy: {accuracy:.2f}")

print("\n📑 Classification Report:")
print(classification_report(y_test, y_pred))

# Feature importance visualization
importances = rf_classifier.feature_importances_
feature_names = X.columns

feature_importance = pd.DataFrame({
    'Feature': feature_names,
    'Importance': importances
}).sort_values('Importance', ascending=False)

plt.figure(figsize=(10, 6))
sns.barplot(x='Importance', y='Feature', data=feature_importance)
plt.title('Feature Importance for Crop Recommendation')
plt.xlabel('Importance Score')
plt.ylabel('Features')
plt.tight_layout()
plt.show()
