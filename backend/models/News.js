const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String }, // added category
  imageUrl: { type: String },
  author: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);
