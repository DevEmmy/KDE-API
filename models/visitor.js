const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    ipAddress: String,
    userAgent: String,
  });
  
  const Visit = mongoose.model('Visit', visitSchema)
  module.exports = Visit