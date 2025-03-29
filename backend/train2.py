import numpy as np
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Load Dataset
df = pd.read_csv("indiancrop_dataset.csv")

# Select Relevant Features
features = ["N_SOIL", "P_SOIL", "K_SOIL", "TEMPERATURE", "HUMIDITY", "ph", "RAINFALL", "CROP", "STATE"]
target = "CROP_PRICE"
df = df[features + [target]]

# Handle Missing Values
df.dropna(inplace=True)

# Encode Categorical Columns
label_enc_crop = LabelEncoder()
df["CROP"] = label_enc_crop.fit_transform(df["CROP"])

label_enc_state = LabelEncoder()
df["STATE"] = label_enc_state.fit_transform(df["STATE"])

# Save Label Encoders
joblib.dump(label_enc_crop, "crop_label_encoder.pkl")
joblib.dump(label_enc_state, "state_label_encoder.pkl")

# Split Dataset
X = df.drop(columns=[target])
y = df[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize Numerical Features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Save Scaler
joblib.dump(scaler, "price_scaler.pkl")

# Train the Model
model = LinearRegression()
model.fit(X_train_scaled, y_train)

# Save the Trained Model
joblib.dump(model, "crop_price_model.pkl")

# Model Evaluation
y_pred = model.predict(X_test_scaled)
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"Model Evaluation:")
print(f"MAE: {mae:.2f}")
print(f"MSE: {mse:.2f}")
print(f"R² Score: {r2:.2f}")
