const mongoose = require('mongoose')

const ComputerSchema = new mongoose.Schema({
  name: String,
  available: Boolean,
  gpu: String,
  cpu: String,
  ram: String,
  motherboard: String,
  table: Number,
  reserved: { type: Boolean, default: false },
  reservedBy: String,
  reservationTime: Date,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Computer', ComputerSchema)
