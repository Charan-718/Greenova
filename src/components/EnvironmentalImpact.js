import React, { useState } from 'react';
import './EnvironmentalImpact.css';

const EnvironmentalImpact = () => {
  const [wasteData, setWasteData] = useState({
    plastic: 0,
    paper: 0,
    glass: 0,
    organic: 0,
    metal: 0
  });

  const [impactResults, setImpactResults] = useState(null);

  const impactFactors = {
    plastic: {
      co2: 3.8, // kg CO2 per kg recycled
      water: 50, // liters water saved per kg
      energy: 25 // kWh energy saved per kg
    },
    paper: {
      co2: 1.3,
      water: 30,
      energy: 15
    },
    glass: {
      co2: 0.3,
      water: 5,
      energy: 2
    },
    organic: {
      co2: 0.5, // compost benefits
      water: 10,
      energy: 8
    },
    metal: {
      co2: 4.5,
      water: 40,
      energy: 30
    }
  };

  const calculateImpact = () => {
    let totalCO2 = 0;
    let totalWater = 0;
    let totalEnergy = 0;
    let totalTrees = 0;

    Object.keys(wasteData).forEach(material => {
      const amount = wasteData[material];
      totalCO2 += amount * impactFactors[material].co2;
      totalWater += amount * impactFactors[material].water;
      totalEnergy += amount * impactFactors[material].energy;
    });

    // Trees saved calculation (based on paper recycling)
    totalTrees = (wasteData.paper * 0.017).toFixed(1);

    setImpactResults({
      co2: totalCO2.toFixed(1),
      water: totalWater.toFixed(0),
      energy: totalEnergy.toFixed(0),
      trees: totalTrees
    });
  };

  const handleInputChange = (material, value) => {
    setWasteData(prev => ({
      ...prev,
      [material]: parseFloat(value) || 0
    }));
  };

  const resetCalculator = () => {
    setWasteData({
      plastic: 0,
      paper: 0,
      glass: 0,
      organic: 0,
      metal: 0
    });
    setImpactResults(null);
  };

  return (
    <div className="environmental-impact">
      <div className="impact-header">
        <h1>🌍 Environmental Impact Calculator</h1>
        <p>See how much you're helping the planet by recycling and composting</p>
      </div>

      <div className="calculator-container">
        <div className="input-section">
          <h2>Enter Your Weekly Waste (in kilograms)</h2>
          <div className="waste-inputs">
            {Object.keys(wasteData).map(material => (
              <div key={material} className="input-group">
                <label>
                  <span className="material-icon">
                    {material === 'plastic' && '♻️'}
                    {material === 'paper' && '📄'}
                    {material === 'glass' && '🍶'}
                    {material === 'organic' && '🥗'}
                    {material === 'metal' && '🔩'}
                  </span>
                  {material.charAt(0).toUpperCase() + material.slice(1)}
                </label>
                <input
                  type="number"
                  value={wasteData[material]}
                  onChange={(e) => handleInputChange(material, e.target.value)}
                  min="0"
                  step="0.1"
                  placeholder="0"
                />
                <span className="unit">kg</span>
              </div>
            ))}
          </div>

          <div className="calculator-actions">
            <button onClick={calculateImpact} className="calculate-btn">
              Calculate Impact
            </button>
            <button onClick={resetCalculator} className="reset-btn">
              Reset
            </button>
          </div>
        </div>

        {impactResults && (
          <div className="results-section">
            <h2>Your Environmental Impact</h2>
            <div className="impact-cards">
              <div className="impact-card co2">
                <div className="impact-icon">🌫️</div>
                <div className="impact-value">{impactResults.co2} kg</div>
                <div className="impact-label">CO₂ Emissions Reduced</div>
                <div className="impact-comparison">
                  Equivalent to {((impactResults.co2 / 2.3) * 10).toFixed(0)} km not driven
                </div>
              </div>

              <div className="impact-card water">
                <div className="impact-icon">💧</div>
                <div className="impact-value">{impactResults.water} L</div>
                <div className="impact-label">Water Saved</div>
                <div className="impact-comparison">
                  Enough for {Math.floor(impactResults.water / 15)} showers
                </div>
              </div>

              <div className="impact-card energy">
                <div className="impact-icon">⚡</div>
                <div className="impact-value">{impactResults.energy} kWh</div>
                <div className="impact-label">Energy Saved</div>
                <div className="impact-comparison">
                  Powers a home for {(impactResults.energy / 30).toFixed(1)} days
                </div>
              </div>

              <div className="impact-card trees">
                <div className="impact-icon">🌳</div>
                <div className="impact-value">{impactResults.trees}</div>
                <div className="impact-label">Trees Saved</div>
                <div className="impact-comparison">
                  Through paper recycling
                </div>
              </div>
            </div>

            <div className="impact-summary">
              <h3>Weekly Impact Summary</h3>
              <p>
                By properly managing your waste this week, you've made a significant 
                positive impact on the environment! Keep up the great work! 🌟
              </p>
            </div>
          </div>
        )}

        {!impactResults && (
          <div className="tips-section">
            <h3>Did You Know?</h3>
            <ul>
              <li>Recycling one plastic bottle saves enough energy to power a 60W light bulb for 6 hours</li>
              <li>Composting food waste reduces methane emissions from landfills</li>
              <li>Recycling aluminum saves 95% of the energy needed to make new aluminum</li>
              <li>Every ton of paper recycled saves 17 trees and 7,000 gallons of water</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvironmentalImpact;