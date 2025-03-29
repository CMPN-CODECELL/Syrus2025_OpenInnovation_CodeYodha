import React, { useState } from "react";
import axios from "axios";

const MarketPrice = () => {
  const [formData, setFormData] = useState({
    N_SOIL: "",
    P_SOIL: "",
    K_SOIL: "",
    TEMPERATURE: "",
    HUMIDITY: "",
    ph: "",
    RAINFALL: "",
    CROP: "",
    STATE: "",
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict_price", formData);
      setPredictedPrice(response.data.predicted_price);
    } catch (err) {
      setError("Error fetching price prediction. Please check your inputs.");
    }
  };

  return (
    <div className="bg-light-cream p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-dark-green text-2xl font-bold mb-4">Crop Market Price Prediction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key.replace("_", " ")}
            value={formData[key]}
            onChange={handleChange}
            className="p-2 border border-mid-green rounded-md"
            required
          />
        ))}
        <button type="submit" className="bg-mid-green text-white p-2 rounded-md hover:bg-dark-green">Predict Price</button>
      </form>
      {predictedPrice && (
        <div className="mt-4 text-lg text-dark-green font-bold">Predicted Price: ₹{predictedPrice}</div>
      )}
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
};

export default MarketPrice;
