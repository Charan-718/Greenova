const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    problemType: {
      type: String,
      required: [true, 'Problem type is required'],
      enum: [
        'Illegal Dumping',
        'Overflowing Bin',
        'Missing Item in Database',
        'Incorrect Information',
        'Collection Point Issue',
        'Other'
      ]
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    photoUrl: {
      type: String,
      default: ''
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: ''
    },
    allowContact: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['Pending', 'In Review', 'Resolved'],
      default: 'Pending'
    },
    resolutionNotes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Report', reportSchema);
