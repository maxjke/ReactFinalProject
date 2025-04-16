const mongoose = require('mongoose');

const ComputerSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  specs:     { type: String },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Computer', ComputerSchema);
