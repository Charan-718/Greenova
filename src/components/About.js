import React from 'react';
import './About.css';

const About = () => {
  const teamMembers = [
    { name: 'Alice Johnson', role: 'Project Lead' },
    { name: 'Bob Smith', role: 'Developer' },
    { name: 'Carol Davis', role: 'Researcher' },
    { name: 'David Wilson', role: 'Designer' },
    { name: 'Eva Brown', role: 'Content Writer' },
    { name: 'Frank Miller', role: 'Data Analyst' },
    { name: 'Grace Lee', role: 'Community Outreach' },
    { name: 'Henry Zhang', role: 'Developer' },
    { name: 'Ivy Chen', role: 'Researcher' },
    { name: 'Jack Taylor', role: 'Designer' },
    { name: 'Karen White', role: 'Content Writer' }
  ];

  const surveyFindings = [
    { percentage: 72, description: 'of residents are confused about which plastics can be recycled' },
    { percentage: 58, description: 'don\'t know where to dispose of hazardous waste like batteries' },
    { percentage: 45, description: 'improperly dispose of e-waste with general trash' },
    { percentage: 81, description: 'expressed interest in better waste management education' },
    { percentage: 63, description: 'would use a digital tool for waste disposal guidance' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Local Waste Wizard</h1>
          <p className="hero-subtitle">
            Empowering our community with smart waste management solutions
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <p>
              Local Waste Wizard was born from a college project aimed at addressing 
              the critical gap in waste management awareness within our community. 
              Our survey revealed significant confusion about proper waste disposal 
              practices, leading to contamination of recyclables and improper handling 
              of hazardous materials.
            </p>
            <p>
              We believe that everyone should have access to clear, accurate, and 
              localized information about waste disposal. By making this knowledge 
              easily accessible, we aim to reduce environmental pollution, increase 
              recycling rates, and build a more sustainable community.
            </p>
          </div>
        </div>
      </section>

      {/* Survey Findings */}
      <section className="findings-section">
        <div className="container">
          <h2>Key Survey Findings</h2>
          <p className="section-intro">
            Based on our comprehensive waste management survey conducted in the locality:
          </p>
          <div className="findings-grid">
            {surveyFindings.map((finding, index) => (
              <div key={index} className="finding-card">
                <div className="percentage-circle">
                  <span className="percentage">{finding.percentage}%</span>
                </div>
                <p className="finding-description">{finding.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <p className="section-intro">
            A dedicated group of 11 students committed to making a difference in our community
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Impact */}
      <section className="impact-section">
        <div className="container">
          <h2>Project Impact & Goals</h2>
          <div className="impact-content">
            <div className="impact-item">
              <h3>🎯 Short-term Goals</h3>
              <ul>
                <li>Reduce recycling contamination by 30% in 6 months</li>
                <li>Educate 500+ households about proper waste disposal</li>
                <li>Increase proper e-waste disposal by 50%</li>
              </ul>
            </div>
            <div className="impact-item">
              <h3>🚀 Long-term Vision</h3>
              <ul>
                <li>Expand to neighboring communities</li>
                <li>Integrate with municipal waste management systems</li>
                <li>Develop a mobile app with additional features</li>
                <li>Reduce overall landfill waste by 25%</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <p>
              Have questions, suggestions, or want to collaborate? We'd love to hear from you!
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>wastewizard-team@college.edu</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🏫</span>
                <span>Environmental Science Department, Our College</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;