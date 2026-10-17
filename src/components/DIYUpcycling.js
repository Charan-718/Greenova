import React, { useState, useEffect } from 'react';
import { fetchDiyProjects, createDiyProject } from '../config/api';
import './DIYUpcycling.css';

const defaultProjects = [
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
    videoId: "HZYnD2LCJPs"
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
];

const DIYUpcycling = () => {
  const [projects, setProjects] = useState(defaultProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [categories] = useState(['All', 'plastic', 'glass', 'paper', 'fabric', 'other']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    description: '',
    category: 'plastic',
    difficulty: 'Easy',
    time: '30 minutes',
    materials: '',
    steps: '',
    videoId: ''
  });

  // Load projects from API
  useEffect(() => {
    let isMounted = true;
    fetchDiyProjects(selectedCategory).then(res => {
      if (isMounted) {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setProjects(res.data.map(p => ({
            id: p._id || p.id,
            title: p.title,
            description: p.description,
            materials: p.materials || [],
            steps: p.steps || [],
            difficulty: p.difficulty || 'Easy',
            time: p.time || '30 minutes',
            image: p.image || '🌱',
            category: p.category || 'plastic',
            videoId: p.videoId || ''
          })));
        } else {
          // Filter default projects locally
          const filtered = selectedCategory === 'All'
            ? defaultProjects
            : defaultProjects.filter(p => p.category === selectedCategory);
          setProjects(filtered);
        }
      }
    });
    return () => { isMounted = false; };
  }, [selectedCategory]);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: newProjectForm.title,
      description: newProjectForm.description,
      category: newProjectForm.category,
      difficulty: newProjectForm.difficulty,
      time: newProjectForm.time,
      materials: newProjectForm.materials.split(',').map(m => m.trim()).filter(Boolean),
      steps: newProjectForm.steps.split('\n').map(s => s.trim()).filter(Boolean),
      image: newProjectForm.category === 'glass' ? '🫙' : newProjectForm.category === 'paper' ? '📰' : '🌱',
      videoId: newProjectForm.videoId
    };

    const res = await createDiyProject(payload);

    if (res.success && res.data) {
      setProjects([res.data, ...projects]);
    } else {
      // Local fallback
      setProjects([{ ...payload, id: Date.now() }, ...projects]);
    }

    setIsSubmitting(false);
    setIsModalOpen(false);
    setNewProjectForm({
      title: '',
      description: '',
      category: 'plastic',
      difficulty: 'Easy',
      time: '30 minutes',
      materials: '',
      steps: '',
      videoId: ''
    });
    alert('🎉 Your DIY project has been shared with the community!');
  };

  return (
    <div className="diy-upcycling">
      <div className="diy-header">
        <h1>🎨 DIY Upcycling Projects</h1>
        <p>Transform waste into wonderful creations with these easy upcycling ideas</p>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: '#10b981',
              color: '#ffffff',
              border: 'none',
              padding: '0.8rem 1.8rem',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
            }}
          >
            ➕ Share a DIY Project
          </button>
        </div>
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

      {/* Submit DIY Modal */}
      {isModalOpen && (
        <div className="project-modal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>✕</button>
            <h2 style={{ marginBottom: '1rem', color: '#1a202c' }}>Share Your DIY Upcycling Project</h2>

            <form onSubmit={handleCreateProject} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.3rem' }}>Project Title *</label>
                <input
                  type="text"
                  required
                  value={newProjectForm.title}
                  onChange={e => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                  placeholder="e.g. Cardboard Desk Organizer"
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.3rem' }}>Description *</label>
                <textarea
                  required
                  rows="3"
                  value={newProjectForm.description}
                  onChange={e => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                  placeholder="Short description of what you made..."
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.3rem' }}>Category</label>
                  <select
                    value={newProjectForm.category}
                    onChange={e => setNewProjectForm({ ...newProjectForm, category: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="plastic">Plastic</option>
                    <option value="glass">Glass</option>
                    <option value="paper">Paper</option>
                    <option value="fabric">Fabric</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.3rem' }}>Difficulty</label>
                  <select
                    value={newProjectForm.difficulty}
                    onChange={e => setNewProjectForm({ ...newProjectForm, difficulty: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.3rem' }}>Materials Needed (comma-separated)</label>
                <input
                  type="text"
                  value={newProjectForm.materials}
                  onChange={e => setNewProjectForm({ ...newProjectForm, materials: e.target.value })}
                  placeholder="e.g. Cardboard box, Scissors, Glue, Ruler"
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.3rem' }}>Step-by-Step Instructions (one per line)</label>
                <textarea
                  rows="4"
                  value={newProjectForm.steps}
                  onChange={e => setNewProjectForm({ ...newProjectForm, steps: e.target.value })}
                  placeholder="1. Measure and cut sections&#10;2. Glue partitions together&#10;3. Decorate with paint"
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '0.8rem',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                {isSubmitting ? 'Saving to Database...' : 'Publish DIY Project 🚀'}
              </button>
            </form>
          </div>
        </div>
      )}

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
              {selectedProject.videoId && (
                <button
                  className={`tab-button ${showVideo ? 'active' : ''}`}
                  onClick={() => setShowVideo(true)}
                >
                  🎥 Video Tutorial
                </button>
              )}
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
                      src={
                        selectedProject.videoId.startsWith('http')
                          ? selectedProject.videoId
                          : `https://www.youtube.com/embed/${selectedProject.videoId}`
                      }
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
              {selectedProject.videoId && (
                <button
                  className="action-button primary"
                  onClick={() => setShowVideo(!showVideo)}
                >
                  {showVideo ? '📋 Show Instructions' : '🎥 Watch Tutorial'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="no-projects">
          <h3>No projects found in this category</h3>
          <p>Be the first to share an upcycling idea in this category!</p>
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