import React, { useState } from 'react';

function CropRecommendation() {
  const [formData, setFormData] = useState({
    soilType: '',
    climate: '',
    waterAvailability: '',
    region: ''
  });

  const [recommendedCrops, setRecommendedCrops] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated crop recommendation logic
    const crops = [
      { name: 'Wheat', suitability: 'High' },
      { name: 'Corn', suitability: 'Medium' },
      { name: 'Rice', suitability: 'Low' }
    ];
    setRecommendedCrops(crops);
  };

  return (
    <div className="crop-recommendation-container">
      <h1>AI-Powered Crop Selection</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Soil Type:</label>
          <select 
            name="soilType" 
            value={formData.soilType} 
            onChange={handleInputChange}
          >
            <option value="">Select Soil Type</option>
            <option value="clay">Clay</option>
            <option value="sandy">Sandy</option>
            <option value="loam">Loam</option>
          </select>
        </div>
        <div>
          <label>Climate:</label>
          <select 
            name="climate" 
            value={formData.climate} 
            onChange={handleInputChange}
          >
            <option value="">Select Climate</option>
            <option value="tropical">Tropical</option>
            <option value="temperate">Temperate</option>
            <option value="arid">Arid</option>
          </select>
        </div>
        <button type="submit">Get Recommendations</button>
      </form>

      {recommendedCrops.length > 0 && (
        <div className="recommendations">
          <h2>Recommended Crops</h2>
          {recommendedCrops.map((crop, index) => (
            <div key={index} className="crop-card">
              <h3>{crop.name}</h3>
              <p>Suitability: {crop.suitability}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CropRecommendation;