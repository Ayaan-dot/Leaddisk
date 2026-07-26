const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [200, 'Name cannot exceed 200 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  budget: {
    type: String,
    required: [true, 'Budget range is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters'],
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Closed'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

leadSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

leadSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model('Lead', leadSchema);

