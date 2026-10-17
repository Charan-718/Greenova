const mongoose = require('mongoose');

const wasteItemSchema = new mongoose.Schema(
  {
    itemId: {
      type: Number,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      index: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['General Waste', 'Recyclable', 'Hazardous', 'Biodegradable', 'E-Waste', 'Other'],
      default: 'General Waste'
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    shortInstructions: {
      type: String,
      default: ''
    },
    disposalSteps: {
      type: [String],
      default: []
    },
    whyImportant: {
      type: String,
      default: ''
    },
    collectionPoints: {
      type: [String],
      default: []
    },
    tags: {
      type: [String],
      default: [],
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Text index for search
wasteItemSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('WasteItem', wasteItemSchema);
