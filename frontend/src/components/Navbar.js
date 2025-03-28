import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">DigiKisan</div>
      <ul className="nav-links">
        <li><Link to="/crop-recommendation">Crop Recommendation</Link></li>
        <li><Link to="/gis-map">GIS Map</Link></li>
        <li><Link to="/irrigation-planner">Irrigation</Link></li>
        <li><Link to="/pest-prediction">Pest Control</Link></li>
        <li><Link to="/weather-forecast">Weather</Link></li>
        <li><Link to="/market-prices">Market Prices</Link></li>
        <li><Link to="/community-forum">Community</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;