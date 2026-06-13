import React, { useState } from 'react';
import './VideoLibrary.css';

const VideoLibrary = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Plastic Recycling Process",
      description: "Learn how plastic bottles are transformed into new products",
      youtubeId: "cNPEH0GOhRw", // Example ID - replace with actual IDs
      category: "recycling",
      duration: "4:15"
    },
    {
      id: 2,
      title: "Home Composting Guide",
      description: "Easy steps to start composting at home",
      youtubeId: "egyNJ7xPyoQ", // Example ID
      category: "composting",
      duration: "6:30"
    },
    {
      id: 3,
      title: "Proper E-Waste Disposal",
      description: "How to safely dispose of electronic waste",
      youtubeId: "vufLW4xOsS4", // Example ID
      category: "e-waste",
      duration: "5:45"
    },
    {
      id: 4,
      title: "Upcycling Plastic Bottles",
      description: "Creative ways to reuse plastic bottles",
      youtubeId: "Xs2hAWuPmSg", // Example ID
      category: "upcycling",
      duration: "8:20"
    }
  ]);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [categories] = useState(['All', 'recycling', 'composting', 'e-waste', 'upcycling', 'education']);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos = selectedCategory === 'All' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const extractYouTubeId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const addVideo = (e) => {
    e.preventDefault();
    const youtubeId = extractYouTubeId(videoUrl);
    
    if (youtubeId) {
      const newVideo = {
        id: videos.length + 1,
        title: "New Video - Edit Title",
        description: "Add description here",
        youtubeId: youtubeId,
        category: "education",
        duration: "0:00"
      };
      
      setVideos([...videos, newVideo]);
      setVideoUrl('');
      alert('Video added successfully! Please update the title and description.');
    } else {
      alert('Please enter a valid YouTube URL');
    }
  };

  return (
    <div className="video-library">
      <div className="video-header">
        <h1>🎬 Waste Management Video Library</h1>
        <p>Learn through engaging videos about proper waste disposal and recycling</p>
      </div>

      {/* Add Video Form - For Admin/Team Use */}
      <div className="add-video-section">
        <h3>Add New Video (Team Only)</h3>
        <form onSubmit={addVideo} className="video-form">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste YouTube video URL here..."
            className="video-url-input"
            required
          />
          <button type="submit" className="add-video-btn">
            Add Video ➕
          </button>
        </form>
      </div>

      {/* Category Filter */}
      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Video Player */}
      {selectedVideo && (
        <div className="video-player-section">
          <div className="video-player-container">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="close-player-btn"
            >
              ✕ Close
            </button>
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <h2>{selectedVideo.title}</h2>
              <p>{selectedVideo.description}</p>
              <div className="video-meta">
                <span className="category-tag">{selectedVideo.category}</span>
                <span className="duration">⏱️ {selectedVideo.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="videos-grid">
        {filteredVideos.map(video => (
          <div 
            key={video.id} 
            className="video-card"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="video-thumbnail">
              <img 
                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={video.title}
              />
              <div className="play-overlay">
                <div className="play-button">▶</div>
              </div>
              <div className="video-duration">{video.duration}</div>
            </div>
            <div className="video-content">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <div className="video-category">{video.category}</div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="no-videos">
          <h3>No videos found in this category</h3>
          <p>Try selecting a different category or add new videos using the form above.</p>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;