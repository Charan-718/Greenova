import React, { useState, useEffect } from 'react';
import { fetchVideos, createVideo } from '../config/api';
import './VideoLibrary.css';

const defaultVideos = [
  {
    id: 1,
    title: "Plastic Recycling Process",
    description: "Learn how plastic bottles are transformed into new products",
    youtubeId: "cNPEH0GOhRw",
    category: "recycling",
    duration: "4:15"
  },
  {
    id: 2,
    title: "Home Composting Guide",
    description: "Easy steps to start composting at home",
    youtubeId: "egyNJ7xPyoQ",
    category: "composting",
    duration: "6:30"
  },
  {
    id: 3,
    title: "Proper E-Waste Disposal",
    description: "How to safely dispose of electronic waste",
    youtubeId: "vufLW4xOsS4",
    category: "e-waste",
    duration: "5:45"
  },
  {
    id: 4,
    title: "Upcycling Plastic Bottles",
    description: "Creative ways to reuse plastic bottles",
    youtubeId: "Xs2hAWuPmSg",
    category: "upcycling",
    duration: "8:20"
  }
];

const VideoLibrary = () => {
  const [videos, setVideos] = useState(defaultVideos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [categories] = useState(['All', 'recycling', 'composting', 'e-waste', 'upcycling', 'education']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchVideos(selectedCategory).then(res => {
      if (isMounted) {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setVideos(res.data.map(v => ({
            id: v._id || v.id,
            title: v.title,
            description: v.description,
            youtubeId: v.youtubeId,
            category: v.category,
            duration: v.duration || '0:00'
          })));
        } else {
          const filtered = selectedCategory === 'All'
            ? defaultVideos
            : defaultVideos.filter(v => v.category === selectedCategory);
          setVideos(filtered);
        }
      }
    });
    return () => { isMounted = false; };
  }, [selectedCategory]);

  const filteredVideos = selectedCategory === 'All'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  const extractYouTubeId = (url) => {
    if (!url) return null;
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) return url.trim();
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const addVideo = async (e) => {
    e.preventDefault();
    const youtubeId = extractYouTubeId(videoUrl);

    if (!youtubeId) {
      alert('Please enter a valid YouTube URL (e.g., https://youtube.com/watch?v=...)');
      return;
    }

    setIsSubmitting(true);
    const newVideoPayload = {
      title: videoTitle.trim() || 'Community Recycling Video',
      description: 'Educational guide added by community team.',
      youtubeId: youtubeId,
      url: videoUrl,
      category: 'education',
      duration: '4:00'
    };

    const res = await createVideo(newVideoPayload);

    if (res.success && res.data) {
      setVideos([res.data, ...videos]);
    } else {
      setVideos([{ ...newVideoPayload, id: Date.now() }, ...videos]);
    }

    setVideoUrl('');
    setVideoTitle('');
    setIsSubmitting(false);
    alert('✅ Video successfully added to the library!');
  };

  return (
    <div className="video-library">
      <div className="video-header">
        <h1>🎬 Waste Management Video Library</h1>
        <p>Learn through engaging videos about proper waste disposal and recycling</p>
      </div>

      {/* Add Video Form */}
      <div className="add-video-section">
        <h3>Add New Video (Community & Team)</h3>
        <form onSubmit={addVideo} className="video-form" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Video Title (optional)..."
              style={{ flex: 1, minWidth: '200px', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
            />
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube video URL here..."
              className="video-url-input"
              required
              style={{ flex: 2, minWidth: '260px' }}
            />
          </div>
          <button type="submit" className="add-video-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Video ➕'}
          </button>
        </form>
      </div>

      {/* Category Filters */}
      <div className="video-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`video-filter ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
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
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="play-button">▶</div>
              <span className="video-duration">{video.duration}</span>
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <div className="video-meta">
                <span className="video-category">{video.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal">
          <div className="modal-content">
            <button
              className="close-modal"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
            <div className="modal-video-container">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="modal-video-info">
              <h2>{selectedVideo.title}</h2>
              <p>{selectedVideo.description}</p>
              <div className="modal-video-meta">
                <span className="category-tag">{selectedVideo.category}</span>
                <span className="duration-tag">⏱️ {selectedVideo.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredVideos.length === 0 && (
        <div className="no-videos">
          <h3>No videos found in this category</h3>
          <p>Add a video above to share knowledge with the community!</p>
        </div>
      )}
    </div>
  );
};

export default VideoLibrary;