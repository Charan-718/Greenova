const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// GET /api/reports - Fetch all reports with optional filters
router.get('/', async (req, res) => {
  try {
    const { status, urgency, problemType } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (urgency) filter.urgency = urgency;
    if (problemType) filter.problemType = problemType;

    const reports = await Report.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: reports.length, data: reports });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ success: false, message: 'Server error fetching reports', error: error.message });
  }
});

// GET /api/reports/:id - Fetch single report
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST /api/reports - Submit a new report
router.post('/', async (req, res) => {
  try {
    const { problemType, location, urgency, description, photoUrl, contactEmail, allowContact } = req.body;

    if (!problemType || !location || !description) {
      return res.status(400).json({
        success: false,
        message: 'Problem type, location, and description are required fields.'
      });
    }

    const report = new Report({
      problemType,
      location,
      urgency: urgency || 'medium',
      description,
      photoUrl: photoUrl || '',
      contactEmail: contactEmail || '',
      allowContact: Boolean(allowContact)
    });

    const savedReport = await report.save();

    res.status(201).json({
      success: true,
      message: 'Problem reported successfully! Our team will review it.',
      data: savedReport
    });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to submit report',
      error: error.message
    });
  }
});

// PATCH /api/reports/:id/status - Update status or resolution notes
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, resolutionNotes } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (resolutionNotes !== undefined) updateData.resolutionNotes = resolutionNotes;

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.json({ success: true, data: updatedReport });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update status', error: error.message });
  }
});

// DELETE /api/reports/:id
router.delete('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    res.json({ success: true, message: 'Report removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting report', error: error.message });
  }
});

module.exports = router;
