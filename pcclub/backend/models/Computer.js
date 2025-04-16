const mongoose = require('mongoose')

const ComputerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  available: { type: Boolean, default: true },
  gpu: { type: String, required: true },
  cpu: { type: String, required: true },
  ram: { type: String, required: true },
  motherboard: { type: String, required: true },
  table: { type: Number, required: true },
  reserved: { type: Boolean, default: false },
  reservedBy: { type: String },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Computer', ComputerSchema)
