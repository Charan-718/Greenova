import React, { useState } from 'react';
import './ReportProblem.css';

const ReportProblem = () => {
  const [formData, setFormData] = useState({
    problemType: '',
    location: '',
    description: '',
    urgency: 'medium',
    contactEmail: '',
    allowContact: false
  });

  const [submitted, setSubmitted] = useState(false);

  const problemTypes = [
    'Illegal Dumping',
    'Overflowing Bin',
    'Missing Item in Database',
    'Incorrect Information',
    'Collection Point Issue',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Problem reported:', formData);
    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      problemType: '',
      location: '',
      description: '',
      urgency: 'medium',
      contactEmail: '',
      allowContact: false
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="report-problem">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h1>Thank You for Your Report!</h1>
          <p>Your problem has been recorded and will be reviewed by our team. We appreciate your help in making our community cleaner.</p>
          <div className="success-actions">
            <button onClick={resetForm} className="report-another-btn">
              Report Another Problem
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-problem">
      <div className="report-header">
        <h1>Report a Problem</h1>
        <p>Help us improve waste management in our community by reporting issues you encounter.</p>
      </div>

      <form onSubmit={handleSubmit} className="report-form">
        {/* Problem Type */}
        <div className="form-group">
          <label htmlFor="problemType">Problem Type *</label>
          <select
            id="problemType"
            name="problemType"
            value={formData.problemType}
            onChange={handleChange}
            required
          >
            <option value="">Select a problem type</option>
            {problemTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Street address, landmark, or area"
            required
          />
        </div>

        {/* Urgency */}
        <div className="form-group">
          <label htmlFor="urgency">Urgency Level</label>
          <div className="urgency-options">
            {['low', 'medium', 'high'].map(level => (
              <label key={level} className="urgency-option">
                <input
                  type="radio"
                  name="urgency"
                  value={level}
                  checked={formData.urgency === level}
                  onChange={handleChange}
                />
                <span className={`urgency-dot ${level}`}></span>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please provide detailed information about the problem..."
            rows="5"
            required
          ></textarea>
        </div>

        {/* Photo Upload - Placeholder for future implementation */}
        <div className="form-group">
          <label>Photo Evidence (Optional)</label>
          <div className="photo-upload">
            <div className="upload-placeholder">
              <span className="upload-icon">📷</span>
              <p>Photo upload feature coming soon</p>
              <small>For now, please describe the issue in detail</small>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="form-group">
          <label htmlFor="contactEmail">Contact Email (Optional)</label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="your.email@example.com"
          />
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="allowContact"
              checked={formData.allowContact}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            Allow us to contact you for more information if needed
          </label>
        </div>

        <button type="submit" className="submit-button">
          Submit Report ✅
        </button>
      </form>

      <div className="report-info">
        <h3>What happens after you report?</h3>
        <div className="info-steps">
          <div className="info-step">
            <span className="step-number">1</span>
            <p>Your report is logged in our system</p>
          </div>
          <div className="info-step">
            <span className="step-number">2</span>
            <p>Our team reviews and verifies the issue</p>
          </div>
          <div className="info-step">
            <span className="step-number">3</span>
            <p>We work with local authorities to resolve it</p>
          </div>
          <div className="info-step">
            <span className="step-number">4</span>
            <p>Database issues are updated within 48 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportProblem;