import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickCategories = [
    { name: 'Plastic', icon: '♻️' },
    { name: 'Glass', icon: '🍶' },
    { name: 'E-Waste', icon: '💻' },
    { name: 'Organic', icon: '🥗' },
    { name: 'Paper', icon: '📄' },
    { name: 'Hazardous', icon: '⚠️' }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/search?q=${encodeURIComponent(category)}`);
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {/* <h1 className="hero-title">GreeNova</h1> */}
          <h1 className="hero-title innovative-title-3">
            GreeNova
            <div className="leaf-particles">
              <span>🍃</span>
              <span>🌿</span>
              <span>🍀</span>
            </div>
          </h1>
          <p className="hero-subtitle">Your smart guide to proper waste disposal in our community</p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to dispose of? (e.g., plastic bottles, batteries,...)"
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="categories-section">
        <h2>Quick Search by Category</h2>
        <div className="categories-grid">
          {quickCategories.map((category, index) => (
            <button
              key={index}
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* New Tools Section */}
      <section className="tools-section">
        <div className="container">
          <h2>Explore More Tools</h2>
          <div className="tools-grid">
            <button 
              onClick={() => navigate('/impact-calculator')}
              className="tool-card"
            >
              <span className="tool-icon">🌍</span>
              <h3>Impact Calculator</h3>
              <p>See your environmental impact</p>
            </button>
            
            <button 
              onClick={() => navigate('/video-library')}
              className="tool-card"
            >
              <span className="tool-icon">🎬</span>
              <h3>Video Library</h3>
              <p>Learn through videos</p>
            </button>
            
            <button 
              onClick={() => navigate('/diy-projects')}
              className="tool-card"
            >
              <span className="tool-icon">🎨</span>
              <h3>DIY Projects</h3>
              <p>Creative upcycling ideas</p>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>Our Local Waste Impact</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">72%</div>
            <div className="stat-label">of residents confused about plastic recycling</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">45%</div>
            <div className="stat-label">improper e-waste disposal rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">68%</div>
            <div className="stat-label">want better waste management guidance</div>
          </div>
        </div>
      </section>      

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Join the Clean Community Movement</h2>
          <div className="cta-buttons">
            <button 
              onClick={() => navigate('/quiz')}
              className="cta-button primary"
            >
              Test Your Knowledge
            </button>
            <button 
              onClick={() => navigate('/report')}
              className="cta-button secondary"
            >
              Report a Problem
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;