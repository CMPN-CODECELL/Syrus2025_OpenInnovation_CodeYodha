
import React from 'react';
import { Link } from 'react-router-dom';
import farmBackgroundVideo from '../assets/farm-background.mp4';

function HomePage() {
  const features = [
    { 
      title: 'Crop Recommendation', 
      description: 'AI-powered crop suggestions',
      link: '/crop-recommendation'
    },
    { 
      title: 'GIS Smart Farming', 
      description: 'Geospatial insights',
      link: '/gis-map'
    },
    { 
      title: 'Irrigation Planner', 
      description: 'Optimize water usage',
      link: '/irrigation-planner'
    },
    { 
      title: 'Pest & Disease Prediction', 
      description: 'AI-driven crop protection',
      link: '/pest-prediction'
    },
    { 
      title: 'Weather Forecast', 
      description: 'Real-time weather analytics',
      link: '/weather-forecast'
    },
    { 
      title: 'Market Prices', 
      description: 'Live crop price updates',
      link: '/market-prices'
    }
  ];

  return (
    <div className="home-container">
      <video 
        src={farmBackgroundVideo}
        autoPlay 
        loop 
        muted 
        className="video-background"
        playsInline
      />

      <div className="home-overlay">
        <div className="home-content">
          <header>
            <h1>DigiKisan: Smart Farming Revolution</h1>
            <p>Empowering Farmers with AI and Geospatial Technology</p>
          </header>
          
          <section className="features-grid">
            {features.map((feature, index) => (
              <Link to={feature.link} key={index} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Link>
            ))}
          </section>

          <section className="platform-description">
            <h2>Transforming Agriculture Through Technology</h2>
            <p>
              DigiKisan leverages AI, GIS, and Fuzzy Inference Systems 
              to provide actionable insights for precision farming, 
              sustainable agriculture, and improved farmer productivity.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;