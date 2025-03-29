import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import farmBackgroundVideo from '../assets/farm-background.mp4';
import { MessageCircle, X } from 'lucide-react';
import './chatbot.css'
function HomePage() {
  const [showChatbot, setShowChatbot] = useState(false);

  const features = [
    { title: 'Crop Recommendation', description: 'AI-powered crop suggestions', link: '/crop-recommendation' },
    { title: 'GIS Smart Farming', description: 'Geospatial insights', link: '/gis-map' },
    { title: 'Irrigation Planner', description: 'Optimize water usage', link: '/irrigation-planner' },
    { title: 'Pest & Disease Prediction', description: 'AI-driven crop protection', link: '/pest-prediction' },
    { title: 'Weather Forecast', description: 'Real-time weather analytics', link: '/weather-forecast' },
    { title: 'Market Prices', description: 'Live crop price updates', link: '/market-prices' }
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

      {/* Fixed chat button */}
      <button 
        className="chat-button"
        onClick={() => setShowChatbot(!showChatbot)}
        aria-label="Toggle Chat"
      >
        {showChatbot ? 
          <X size={24} /> : 
          <>
            <MessageCircle size={24} />
            <span className="button-text">Ask FASAL AI</span>
          </>
        }
      </button>

      {/* Chatbot popup */}
      {showChatbot && (
        <div className="chat-popup">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/Bx_-k_9-5TXSxE0avRiEE"
            width="100%"
            height="100%"
            frameBorder="0"
            title="FASAL AI Chatbot"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default HomePage;