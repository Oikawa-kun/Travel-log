const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  photos: [{ type: String }],
  rating: { type: Number, min: 1, max: 5, default: 3 },
  tags: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
