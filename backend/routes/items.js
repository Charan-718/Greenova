const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const WasteItem = require('../models/WasteItem');

// GET /api/items - Search or filter waste items
router.get('/', async (req, res) => {
  try {
    const { q, category } = req.query;
    const query = {};

    if (category && category !== 'All') {
      query.category = new RegExp(`^${category}$`, 'i');
    }

    if (q && q.trim()) {
      const searchTerm = q.trim();
      const regex = new RegExp(searchTerm, 'i');
      query.$or = [
        { name: regex },
        { description: regex },
        { tags: { $in: [regex] } },
        { category: regex }
      ];
    }

    const items = await WasteItem.find(query).sort({ itemId: 1, name: 1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET /api/items/:id - Fetch single item by itemId or ObjectId
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let item = null;

    if (!isNaN(id)) {
      item = await WasteItem.findOne({ itemId: Number(id) });
    }

    if (!item && mongoose.Types.ObjectId.isValid(id)) {
      item = await WasteItem.findById(id);
    }

    if (!item) {
      return res.status(404).json({ success: false, message: 'Waste item not found' });
    }

    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST /api/items - Add a new waste item
router.post('/', async (req, res) => {
  try {
    const { name, category, description, shortInstructions, disposalSteps, whyImportant, collectionPoints, tags } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({ success: false, message: 'Name, category, and description are required.' });
    }

    // Auto-generate numeric itemId if not provided
    const lastItem = await WasteItem.findOne().sort({ itemId: -1 });
    const nextItemId = lastItem && lastItem.itemId ? lastItem.itemId + 1 : 1;

    const newItem = new WasteItem({
      itemId: req.body.itemId || nextItemId,
      name,
      category,
      description,
      shortInstructions: shortInstructions || '',
      disposalSteps: Array.isArray(disposalSteps) ? disposalSteps : [],
      whyImportant: whyImportant || '',
      collectionPoints: Array.isArray(collectionPoints) ? collectionPoints : [],
      tags: Array.isArray(tags) ? tags : []
    });

    const saved = await newItem.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create item', error: error.message });
  }
});

module.exports = router;
