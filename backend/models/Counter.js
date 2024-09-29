const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 1000, // Start from 1000 (or any number you prefer)
  },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
