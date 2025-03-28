import React, { useState } from 'react';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://127.0.0.1:5000/predict"; // Flask backend URL

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateInputs = () => {
    const inputs = [
      { name: 'N', min: 0, max: 100 },
      { name: 'P', min: 0, max: 100 },
      { name: 'K', min: 0, max: 100 },
      { name: 'temperature', min: 0, max: 50 },
      { name: 'humidity', min: 0, max: 100 },
      { name: 'ph', min: 0, max: 14 },
      { name: 'rainfall', min: 0, max: 5000 }
    ];

    for (let input of inputs) {
      const value = parseFloat(formData[input.name]);
      if (isNaN(value) || value < input.min || value > input.max) {
        setError(`Invalid ${input.name}. Must be between ${input.min} and ${input.max}.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setRecommendation(result.crop);
      } else {
        setError(result.error || "Failed to get recommendation.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Crop Recommendation System</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            {Object.keys(formData).map((key) => (
              <input
                key={key}
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)} (${key === "ph" ? "0-14" : "0-100"})`}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                required
              />
            ))}
          </div>

          {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

          <button 
            type="submit" 
            style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Get Crop Recommendation'}
          </button>
        </form>

        {recommendation && (
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f2f2f2', textAlign: 'center', borderRadius: '4px' }}>
            <h2>Recommended Crop: {recommendation}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;
