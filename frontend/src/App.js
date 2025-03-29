import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CropRecommendation from './components/CropRecommendation';
import GISMap from './components/GISMap';
import IrrigationPlanner from './components/IrrigationPlanner';
import PestPrediction from './components/PestPrediction';
import WeatherForecast from './components/WeatherForecast';
//import CommunityForum from './components/CommunityForum';
//import MarketPrices from './components/MarketPrices';
import './App.css';
import FarmChat from './components/FarmChat';
import MarketPrice from './components/MarketPrice';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crop-recommendation" element={<CropRecommendation />} />
          <Route path="/gis-map" element={<GISMap />} />
          <Route path="/irrigation-planner" element={<IrrigationPlanner />} />
          <Route path="/pest-prediction" element={<PestPrediction />} />
          <Route path="/weather-forecast" element={<WeatherForecast />} />
          <Route path="/market-price" element={<MarketPrice />} />
          <Route path="/farmchat" element={<FarmChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;