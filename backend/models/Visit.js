const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  points: { type: Number, default: 1 },
});

module.exports = mongoose.model('Visit', visitSchema);
