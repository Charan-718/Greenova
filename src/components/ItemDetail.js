import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemDetail.css';

// Mock data - replace with your actual data
const itemsData = {
  1: {
    id: 1,
    name: 'Pizza Box',
    category: 'General Waste',
    description: 'Cardboard box used for pizza delivery. Often contaminated with grease and food residues.',
    disposalSteps: [
      'Check if the box is heavily soiled with grease, cheese, or food particles',
      'If contaminated, tear off any clean cardboard lids or sections for recycling',
      'Place the greasy/main portion in the general waste bin',
      'If the entire box is clean, it can be recycled with cardboard'
    ],
    whyImportant: 'Grease and food contamination can ruin entire batches of recyclable paper products.',
    collectionPoints: [
      'Main Recycling Center - 123 Green Street',
      'Community Waste Facility - 456 Eco Avenue'
    ],
    tags: ['cardboard', 'food', 'greasy', 'paper']
  },
  2: {
    id: 2,
    name: 'Plastic Bottle (PET)',
    category: 'Recyclable',
    description: 'Clear plastic bottles used for water, soda, and other beverages. Marked with ♳ or PET symbol.',
    disposalSteps: [
      'Empty any remaining liquid from the bottle',
      'Rinse briefly with water to remove residue',
      'Remove the cap (often different plastic type)',
      'Crush the bottle to save space if possible',
      'Place in recycling bin or take to recycling center'
    ],
    whyImportant: 'PET plastic can be efficiently recycled into new bottles, clothing, and other products.',
    collectionPoints: [
      'Curbside Recycling Bin',
      'Supermarket Recycling Bins',
      'Main Recycling Center - 123 Green Street'
    ],
    tags: ['plastic', 'bottle', 'pet', 'recyclable']
  }
};

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = itemsData[id];

  if (!item) {
    return (
      <div className="item-detail">
        <div className="error-state">
          <h2>Item Not Found</h2>
          <p>The requested waste item could not be found.</p>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Recyclable': '#4CAF50',
      'Biodegradable': '#8BC34A',
      'Hazardous': '#F44336',
      'General Waste': '#9E9E9E'
    };
    return colors[category] || '#9E9E9E';
  };

  return (
    <div className="item-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Results
      </button>

      <div className="item-header">
        <div className="item-title-section">
          <h1>{item.name}</h1>
          <span 
            className="category-badge large"
            style={{ backgroundColor: getCategoryColor(item.category) }}
          >
            {item.category}
          </span>
        </div>
        <p className="item-description">{item.description}</p>
      </div>

      <div className="item-content">
        {/* Disposal Instructions */}
        <section className="instructions-section">
          <h2>🔄 How to Dispose Properly</h2>
          <div className="steps-list">
            {item.disposalSteps.map((step, index) => (
              <div key={index} className="step-item">
                <span className="step-number">{index + 1}</span>
                <span className="step-text">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Why It's Important */}
        <section className="importance-section">
          <h2>💡 Why This Matters</h2>
          <p>{item.whyImportant}</p>
        </section>

        {/* Collection Points */}
        <section className="collection-section">
          <h2>📍 Where to Dispose</h2>
          <div className="collection-points">
            {item.collectionPoints.map((point, index) => (
              <div key={index} className="collection-point">
                <span className="point-icon">📌</span>
                <span className="point-name">{point}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/map')}
            className="view-map-button"
          >
            View on Map 🗺️
          </button>
        </section>

        {/* Tags */}
        <section className="tags-section">
          <h3>Related Tags</h3>
          <div className="item-tags">
            {item.tags.map((tag, index) => (
              <span 
                key={index} 
                className="tag"
                onClick={() => navigate(`/search?q=${tag}`)}
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Help Section */}
      <div className="help-section">
        <p>Can't find what you're looking for?</p>
        <button 
          onClick={() => navigate('/report')}
          className="help-button"
        >
          Report Missing Item or Problem
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;