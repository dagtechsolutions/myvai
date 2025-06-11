const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news, with optional category filter
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }
  const news = await News.find(filter).sort({ date: -1 });
  res.json(news);
});

// Add news
router.post('/', async (req, res) => {
  const { title, content, category, imageUrl, author } = req.body;
  const newNews = new News({ title, content, category, imageUrl, author });
  await newNews.save();
  res.status(201).json(newNews);
});

module.exports = router;
