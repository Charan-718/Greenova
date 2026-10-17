const express = require('express');
const router = express.Router();
const DiyProject = require('../models/DiyProject');

// GET /api/diy-projects - Fetch all DIY projects
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'All') {
      filter.category = category.toLowerCase();
    }

    const projects = await DiyProject.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST /api/diy-projects - Create new DIY project
router.post('/', async (req, res) => {
  try {
    const { title, description, materials, steps, difficulty, time, image, category, videoId } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    const project = new DiyProject({
      title,
      description,
      materials: Array.isArray(materials) ? materials : (typeof materials === 'string' ? materials.split(',').map(s => s.trim()) : []),
      steps: Array.isArray(steps) ? steps : (typeof steps === 'string' ? steps.split('\n').map(s => s.trim()).filter(Boolean) : []),
      difficulty: difficulty || 'Easy',
      time: time || '30 minutes',
      image: image || '🌱',
      category: category ? category.toLowerCase() : 'plastic',
      videoId: videoId || ''
    });

    const saved = await project.save();
    res.status(201).json({ success: true, message: 'Project created successfully!', data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create project', error: error.message });
  }
});

module.exports = router;
