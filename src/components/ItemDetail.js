import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchWasteItemById } from '../config/api';
import './ItemDetail.css';

// Default base data
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
  },
  3: {
    id: 3,
    name: 'Batteries',
    category: 'Hazardous',
    description: 'All types of household batteries (AA, AAA, 9V, button cells, rechargeable).',
    disposalSteps: [
      'Tape battery terminals with clear electrical tape to prevent short circuits',
      'Store in a cool, dry place away from flammable materials',
      'Do not crush, puncture, or burn batteries',
      'Drop off at designated battery drop-off bins or e-waste events'
    ],
    whyImportant: 'Batteries contain heavy metals like lead, mercury, and cadmium which leach into groundwater.',
    collectionPoints: [
      'Local Electronics Retailers Drop-Box',
      'Municipal Hazardous Waste Center',
      'City Hall Collection Kiosk'
    ],
    tags: ['hazardous', 'electronic', 'chemical', 'dangerous']
  }
};

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(itemsData[id] || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadItem() {
      setLoading(true);
      const res = await fetchWasteItemById(id);

      if (isMounted) {
        if (res.success && res.data) {
          const apiItem = res.data;
          setItem({
            id: apiItem.itemId || apiItem._id,
            name: apiItem.name,
            category: apiItem.category,
            description: apiItem.description,
            disposalSteps: apiItem.disposalSteps?.length
              ? apiItem.disposalSteps
              : [apiItem.shortInstructions || 'Follow proper local waste sorting guidelines.'],
            whyImportant: apiItem.whyImportant || 'Proper waste segregation maintains community health and recycling efficiency.',
            collectionPoints: apiItem.collectionPoints?.length
              ? apiItem.collectionPoints
              : ['Municipal Collection Bins', 'Local Community Recycling Depot'],
            tags: apiItem.tags || []
          });
        } else if (itemsData[id]) {
          setItem(itemsData[id]);
        }
        setLoading(false);
      }
    }

    loadItem();
    return () => { isMounted = false; };
  }, [id]);

  const getCategoryColor = (category) => {
    const colors = {
      'Recyclable': '#4CAF50',
      'Biodegradable': '#8BC34A',
      'Hazardous': '#F44336',
      'General Waste': '#9E9E9E'
    };
    return colors[category] || '#9E9E9E';
  };

  if (loading && !item) {
    return (
      <div className="item-detail">
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Loading waste disposal instructions...</p>
        </div>
      </div>
    );
  }

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
            {item.disposalSteps && item.disposalSteps.map((step, index) => (
              <div key={index} className="step-item">
                <span className="step-number">{index + 1}</span>
                <span className="step-text">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Why It's Important */}
        <section className="importance-section">
          <h2>🌍 Why Proper Disposal Matters</h2>
          <p>{item.whyImportant}</p>
        </section>

        {/* Collection Points */}
        <section className="collection-section">
          <h2>📍 Where to Take It</h2>
          <div className="points-list">
            {item.collectionPoints && item.collectionPoints.map((point, index) => (
              <div key={index} className="point-item">
                <span className="point-icon">🏢</span>
                <span className="point-name">{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tags */}
        <section className="tags-section">
          <h3>Related Tags</h3>
          <div className="item-tags">
            {item.tags && item.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetail;