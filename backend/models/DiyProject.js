const mongoose = require('mongoose');

const diyProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true
    },
    materials: {
      type: [String],
      default: []
    },
    steps: {
      type: [String],
      default: []
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Intermediate', 'Advanced'],
      default: 'Easy'
    },
    time: {
      type: String,
      default: '30 minutes'
    },
    image: {
      type: String,
      default: '🌱'
    },
    category: {
      type: String,
      enum: ['plastic', 'glass', 'paper', 'fabric', 'other'],
      default: 'plastic'
    },
    videoId: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('DiyProject', diyProjectSchema);
