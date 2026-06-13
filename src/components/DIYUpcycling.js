import React, { useState } from 'react';
import './DIYUpcycling.css';

const DIYUpcycling = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Plastic Bottle Planters",
      description: "Turn plastic bottles into beautiful hanging planters for your garden",
      materials: ["Empty plastic bottles", "Scissors", "Acrylic paint", "String", "Soil", "Plants"],
      steps: [
        "Cut the plastic bottle in half",
        "Paint the bottle with acrylic paint and let it dry",
        "Poke drainage holes in the bottom",
        "Add soil and your favorite plant",
        "Attach string for hanging"
      ],
      difficulty: "Easy",
      time: "30 minutes",
      image: "🌱",
      category: "plastic",
      videoId: "https://youtube.com/shorts/HZYnD2LCJPs?si=pP2qWza5qr4PW0Id" // Example YouTube ID
    },
    {
      id: 2,
      title: "Glass Jar Storage",
      description: "Create elegant storage containers from glass jars",
      materials: ["Glass jars with lids", "Spray paint", "Twine", "Labels"],
      steps: [
        "Clean and dry the glass jars thoroughly",
        "Spray paint the lids in your preferred color",
        "Wrap twine around the neck of the jar",
        "Add custom labels for organization",
        "Use for spices, crafts, or office supplies"
      ],
      difficulty: "Easy",
      time: "20 minutes",
      image: "🫙",
      category: "glass",
      videoId: "zO3jFKiqm0M"
    },
    {
      id: 3,
      title: "Newspaper Basket",
      description: "Weave a sturdy basket from old newspapers",
      materials: ["Newspapers", "Glue", "Clothespins", "Paint", "Varnish"],
      steps: [
        "Roll newspapers tightly into tubes",
        "Weave tubes into a basket shape",
        "Secure with glue and clothespins",
        "Let dry completely",
        "Paint and varnish for durability"
      ],
      difficulty: "Intermediate",
      time: "2 hours",
      image: "📰",
      category: "paper",
      videoId: "YAUPTaEe9pw"
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [categories] = useState(['All', 'plastic', 'glass', 'paper', 'fabric', 'other']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const addProject = (newProject) => {
    // This would typically connect to a backend
    setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
  };

  return (
    <div className="diy-upcycling">
      <div className="diy-header">
        <h1>🎨 DIY Upcycling Projects</h1>
        <p>Transform waste into wonderful creations with these easy upcycling ideas</p>
      </div>

      {/* Category Filters */}
      <div className="project-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`project-filter ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <div 
            key={project.id} 
            className="project-card"
            onClick={() => setSelectedProject(project)}
          >
            <div className="project-icon">{project.image}</div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-meta">
                <span className={`difficulty ${project.difficulty.toLowerCase()}`}>
                  {project.difficulty}
                </span>
                <span className="time">⏱️ {project.time}</span>
              </div>
              <div className="project-category">{project.category}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="project-modal">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => {
                setSelectedProject(null);
                setShowVideo(false);
              }}
            >
              ✕
            </button>

            <div className="modal-header">
              <div className="project-icon-large">{selectedProject.image}</div>
              <div className="modal-title">
                <h2>{selectedProject.title}</h2>
                <p>{selectedProject.description}</p>
                <div className="project-meta-large">
                  <span className={`difficulty ${selectedProject.difficulty.toLowerCase()}`}>
                    {selectedProject.difficulty}
                  </span>
                  <span className="time">⏱️ {selectedProject.time}</span>
                  <span className="category">{selectedProject.category}</span>
                </div>
              </div>
            </div>

            <div className="modal-tabs">
              <button 
                className={`tab-button ${!showVideo ? 'active' : ''}`}
                onClick={() => setShowVideo(false)}
              >
                📋 Instructions
              </button>
              <button 
                className={`tab-button ${showVideo ? 'active' : ''}`}
                onClick={() => setShowVideo(true)}
              >
                🎥 Video Tutorial
              </button>
            </div>

            <div className="tab-content">
              {!showVideo ? (
                <div className="instructions-content">
                  <div className="materials-section">
                    <h3>Materials Needed</h3>
                    <ul className="materials-list">
                      {selectedProject.materials.map((material, index) => (
                        <li key={index}>📌 {material}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="steps-section">
                    <h3>Step-by-Step Instructions</h3>
                    <div className="steps-list">
                      {selectedProject.steps.map((step, index) => (
                        <div key={index} className="step-item">
                          <div className="step-number">{index + 1}</div>
                          <div className="step-text">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="video-content">
                  <div className="video-wrapper">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedProject.videoId}`}
                      title={`${selectedProject.title} Tutorial`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="video-note">
                    Watch this tutorial to see the upcycling process in action!
                  </p>
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button 
                className="action-button primary"
                onClick={() => setShowVideo(!showVideo)}
              >
                {showVideo ? '📋 Show Instructions' : '🎥 Watch Tutorial'}
              </button>
              <button className="action-button secondary">
                📤 Share Project
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="no-projects">
          <h3>No projects found in this category</h3>
          <p>Check back soon for new upcycling ideas!</p>
        </div>
      )}

      <div className="diy-tips">
        <h3>💡 Upcycling Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Clean Thoroughly</h4>
            <p>Always clean and dry items before upcycling to prevent mold and odors</p>
          </div>
          <div className="tip-card">
            <h4>Be Creative</h4>
            <p>Don't be afraid to experiment with colors and designs</p>
          </div>
          <div className="tip-card">
            <h4>Safety First</h4>
            <p>Use proper tools and protective equipment when needed</p>
          </div>
          <div className="tip-card">
            <h4>Share Your Work</h4>
            <p>Inspire others by sharing your upcycling creations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DIYUpcycling;