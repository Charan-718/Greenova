const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Video title is required'],
      trim: true
    },
    description: {
      type: String,
      default: ''
    },
    youtubeId: {
      type: String,
      required: [true, 'YouTube ID is required'],
      trim: true
    },
    category: {
      type: String,
      enum: ['recycling', 'composting', 'e-waste', 'upcycling', 'education', 'other'],
      default: 'recycling'
    },
    duration: {
      type: String,
      default: '0:00'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Video', videoSchema);
