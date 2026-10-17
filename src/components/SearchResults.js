import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchWasteItems } from '../config/api';
import './SearchResults.css';

// Default fallback items
const defaultWasteItems = [
  {
    id: 1,
    name: 'Pizza Box',
    category: 'General Waste',
    description: 'Cardboard box used for pizza delivery',
    shortInstructions: 'Dispose with general waste if greasy',
    tags: ['cardboard', 'food', 'greasy']
  },
  {
    id: 2,
    name: 'Plastic Bottle (PET)',
    category: 'Recyclable',
    description: 'PET plastic bottles (water, soda, etc.)',
    shortInstructions: 'Rinse and put in recycling bin',
    tags: ['plastic', 'bottle', 'pet', 'drink']
  },
  {
    id: 3,
    name: 'Batteries',
    category: 'Hazardous',
    description: 'All types of household batteries',
    shortInstructions: 'Take to designated collection point',
    tags: ['hazardous', 'electronic', 'chemical', 'dangerous']
  },
  {
    id: 4,
    name: 'Vegetable Peels',
    category: 'Biodegradable',
    description: 'Fruit and vegetable waste',
    shortInstructions: 'Compost or organic waste bin',
    tags: ['organic', 'food', 'compost', 'kitchen']
  },
  {
    id: 5,
    name: 'Glass Bottles',
    category: 'Recyclable',
    description: 'Clear, green, or brown glass containers',
    shortInstructions: 'Rinse and place in glass recycling',
    tags: ['glass', 'bottle', 'jar', 'transparent']
  },
  {
    id: 6,
    name: 'Aluminum Cans',
    category: 'Recyclable',
    description: 'Soda, beer, and food cans',
    shortInstructions: 'Rinse and crush if possible',
    tags: ['metal', 'aluminum', 'can', 'drink']
  },
  {
    id: 7,
    name: 'Newspapers',
    category: 'Recyclable',
    description: 'Newsprint and paper materials',
    shortInstructions: 'Place in paper recycling bin',
    tags: ['paper', 'newspaper', 'reading', 'dry']
  },
  {
    id: 8,
    name: 'Egg Shells',
    category: 'Biodegradable',
    description: 'Crushed eggshells from cooking',
    shortInstructions: 'Add to compost pile',
    tags: ['organic', 'food', 'compost', 'kitchen']
  },
  {
    id: 9,
    name: 'Used Motor Oil',
    category: 'Hazardous',
    description: 'Used automotive engine oil',
    shortInstructions: 'Take to auto parts store or recycling center',
    tags: ['hazardous', 'automotive', 'chemical', 'liquid']
  },
  {
    id: 10,
    name: 'Styrofoam',
    category: 'General Waste',
    description: 'Polystyrene foam packaging',
    shortInstructions: 'Dispose with general waste',
    tags: ['plastic', 'foam', 'packaging', 'non-recyclable']
  },
  {
    id: 11,
    name: 'Coffee Grounds',
    category: 'Biodegradable',
    description: 'Used coffee grounds from brewing',
    shortInstructions: 'Excellent for composting',
    tags: ['organic', 'coffee', 'compost', 'kitchen']
  },
  {
    id: 12,
    name: 'Broken Glass',
    category: 'General Waste',
    description: 'Shattered glass from windows or containers',
    shortInstructions: 'Wrap securely before disposal',
    tags: ['glass', 'broken', 'sharp', 'dangerous']
  },
  {
    id: 13,
    name: 'Cardboard Boxes',
    category: 'Recyclable',
    description: 'Clean corrugated cardboard packaging',
    shortInstructions: 'Flatten and place in recycling',
    tags: ['cardboard', 'packaging', 'paper', 'dry']
  },
  {
    id: 14,
    name: 'Paint Cans',
    category: 'Hazardous',
    description: 'Leftover paint and containers',
    shortInstructions: 'Take to hazardous waste facility',
    tags: ['hazardous', 'chemical', 'paint', 'liquid']
  },
  {
    id: 15,
    name: 'Tea Bags',
    category: 'Biodegradable',
    description: 'Used tea bags and leaves',
    shortInstructions: 'Compost or organic waste',
    tags: ['organic', 'tea', 'compost', 'kitchen']
  },
  {
    id: 16,
    name: 'Plastic Bags',
    category: 'Recyclable',
    description: 'Shopping bags and plastic film',
    shortInstructions: 'Take to supermarket recycling bin',
    tags: ['plastic', 'bag', 'film', 'shopping']
  },
  {
    id: 17,
    name: 'Light Bulbs',
    category: 'Hazardous',
    description: 'Incandescent, LED, and fluorescent bulbs',
    shortInstructions: 'Check type - some require special disposal',
    tags: ['electronic', 'glass', 'hazardous', 'lighting']
  },
  {
    id: 18,
    name: 'Yard Waste',
    category: 'Biodegradable',
    description: 'Grass clippings, leaves, and small branches',
    shortInstructions: 'Compost or yard waste collection',
    tags: ['organic', 'garden', 'leaves', 'grass']
  },
  {
    id: 19,
    name: 'Aerosol Cans',
    category: 'Hazardous',
    description: 'Spray cans for products like deodorant',
    shortInstructions: 'Ensure empty, then recycle if possible',
    tags: ['metal', 'aerosol', 'chemical', 'pressure']
  },
  {
    id: 20,
    name: 'Milk Cartons',
    category: 'Recyclable',
    description: 'Paper-based liquid containers',
    shortInstructions: 'Rinse and place in recycling',
    tags: ['paper', 'carton', 'liquid', 'food']
  },
  {
    id: 21,
    name: 'Cooking Oil',
    category: 'Hazardous',
    description: 'Used vegetable or cooking oil',
    shortInstructions: 'Take to recycling center - never pour down drain',
    tags: ['hazardous', 'oil', 'liquid', 'kitchen']
  },
  {
    id: 22,
    name: 'Pizza Boxes (Clean)',
    category: 'Recyclable',
    description: 'Unsoiled pizza box cardboard',
    shortInstructions: 'If clean, recycle with cardboard',
    tags: ['cardboard', 'paper', 'clean', 'dry']
  },
  {
    id: 23,
    name: 'Electronics (E-Waste)',
    category: 'Hazardous',
    description: 'Computers, phones, and other electronic devices',
    shortInstructions: 'Take to e-waste recycling center',
    tags: ['electronic', 'hazardous', 'technology', 'metal']
  },
  {
    id: 24,
    name: 'Bread Crusts',
    category: 'Biodegradable',
    description: 'Stale bread and crust pieces',
    shortInstructions: 'Compost or organic waste',
    tags: ['organic', 'food', 'bread', 'kitchen']
  },
  {
    id: 25,
    name: 'Aluminum Foil',
    category: 'Recyclable',
    description: 'Clean aluminum foil and trays',
    shortInstructions: 'Clean and ball up for recycling',
    tags: ['metal', 'aluminum', 'foil', 'kitchen']
  },
  {
    id: 26,
    name: 'Medications',
    category: 'Hazardous',
    description: 'Expired or unused prescription drugs',
    shortInstructions: 'Take to pharmacy for safe disposal',
    tags: ['hazardous', 'medical', 'chemical', 'drugs']
  },
  {
    id: 27,
    name: 'Wine Corks',
    category: 'Biodegradable',
    description: 'Natural cork from wine bottles',
    shortInstructions: 'Compost or reuse for crafts',
    tags: ['organic', 'cork', 'wine', 'natural']
  },
  {
    id: 28,
    name: 'Plastic Utensils',
    category: 'General Waste',
    description: 'Single-use plastic forks, spoons, knives',
    shortInstructions: 'Dispose with general waste',
    tags: ['plastic', 'utensils', 'single-use', 'kitchen']
  },
  {
    id: 29,
    name: 'Magazines',
    category: 'Recyclable',
    description: 'Glossy paper magazines and catalogs',
    shortInstructions: 'Place in paper recycling',
    tags: ['paper', 'magazine', 'glossy', 'reading']
  },
  {
    id: 30,
    name: 'Fluorescent Tubes',
    category: 'Hazardous',
    description: 'Tube-style fluorescent light bulbs',
    shortInstructions: 'Take to hazardous waste facility',
    tags: ['hazardous', 'lighting', 'glass', 'mercury']
  },
  {
    id: 31,
    name: 'Pencil Shavings',
    category: 'Biodegradable',
    description: 'Wood and graphite pencil remains',
    shortInstructions: 'Compost or general waste',
    tags: ['organic', 'wood', 'pencil', 'office']
  },
  {
    id: 32,
    name: 'Shredded Paper',
    category: 'Recyclable',
    description: 'Confidential documents after shredding',
    shortInstructions: 'Place in paper recycling in sealed bag',
    tags: ['paper', 'shredded', 'office', 'confidential']
  },
  {
    id: 33,
    name: 'Ceramics',
    category: 'General Waste',
    description: 'Broken plates, mugs, and pottery',
    shortInstructions: 'Wrap securely and dispose',
    tags: ['ceramic', 'broken', 'dishware', 'non-recyclable']
  },
  {
    id: 34,
    name: 'Fire Extinguishers',
    category: 'Hazardous',
    description: 'Used or expired fire extinguishers',
    shortInstructions: 'Take to hazardous waste facility',
    tags: ['hazardous', 'pressure', 'chemical', 'safety']
  },
  {
    id: 35,
    name: 'Hair',
    category: 'Biodegradable',
    description: 'Human or pet hair from grooming',
    shortInstructions: 'Compost or general waste',
    tags: ['organic', 'hair', 'natural', 'grooming']
  }
];

const categories = ['All', 'Recyclable', 'Biodegradable', 'Hazardous', 'General Waste'];

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(defaultWasteItems);
  const [loading, setLoading] = useState(false);

  // Extract search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [location]);

  // Load items from backend or fallback to default dataset
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchWasteItems(searchQuery, selectedCategory)
      .then((res) => {
        if (isMounted) {
          if (res.success && Array.isArray(res.data) && res.data.length > 0) {
            setItems(
              res.data.map(item => ({
                id: item.itemId || item._id,
                name: item.name,
                category: item.category,
                description: item.description,
                shortInstructions: item.shortInstructions,
                tags: item.tags || []
              }))
            );
          } else {
            // Apply client-side filter on default items
            const filtered = defaultWasteItems.filter(item => {
              const query = searchQuery.toLowerCase().trim();
              const matchesSearch = !query ||
                item.name.toLowerCase().includes(query) ||
                item.tags.some(tag => tag.toLowerCase().includes(query)) ||
                item.description.toLowerCase().includes(query);
              const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
              return matchesSearch && matchesCategory;
            });
            setItems(filtered);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => { isMounted = false; };
  }, [searchQuery, selectedCategory]);

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

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
    <div className="search-results">
      <div className="search-header">
        <h1>Search Results</h1>
        <p className="search-query">
          {searchQuery ? `Showing results for: "${searchQuery}"` : 'Browse all waste categories'}
        </p>
      </div>

      <div className="search-content">
        {/* Category Filters */}
        <div className="filters-section">
          <h3>Filter by Category</h3>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                style={{
                  borderColor: getCategoryColor(category)
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="results-section">
          <div className="results-count">
            {loading ? 'Searching database...' : `Found ${items.length} item(s)`}
          </div>

          {items.length === 0 && !loading ? (
            <div className="no-results">
              <h3>No items found</h3>
              <p>Try searching with different keywords or check the spelling.</p>
              <button
                onClick={() => navigate('/report')}
                className="suggest-item-btn"
              >
                Suggest this item to be added
              </button>
            </div>
          ) : (
            <div className="results-grid">
              {items.map(item => (
                <div
                  key={item.id}
                  className="result-card"
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className="card-header">
                    <h3 className="item-name">{item.name}</h3>
                    <span
                      className="category-badge"
                      style={{ backgroundColor: getCategoryColor(item.category) }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <p className="item-instructions">{item.shortInstructions}</p>
                  <div className="item-tags">
                    {item.tags && item.tags.map((tag, index) => (
                      <span key={index} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;