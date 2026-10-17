const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Helper to extract YouTube ID
const extractYouTubeId = (url) => {
  if (!url) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

// GET /api/videos - Fetch all videos
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category.toLowerCase();
    }

    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: videos.length, data: videos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST /api/videos - Add new video
router.post('/', async (req, res) => {
  try {
    const { title, description, url, youtubeId, category, duration } = req.body;

    const extractedId = youtubeId || extractYouTubeId(url);
    if (!extractedId) {
      return res.status(400).json({ success: false, message: 'Valid YouTube URL or 11-character video ID is required.' });
    }

    const video = new Video({
      title: title || 'Educational Waste Management Video',
      description: description || '',
      youtubeId: extractedId,
      category: category ? category.toLowerCase() : 'education',
      duration: duration || '0:00'
    });

    const saved = await video.save();
    res.status(201).json({ success: true, message: 'Video added successfully!', data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to add video', error: error.message });
  }
});

// DELETE /api/videos/:id
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ success: false, message: 'Video not found' });
    res.json({ success: true, message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
