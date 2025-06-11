const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news
router.get('/', async (req, res) => {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
});

// Add news
router.post('/', async (req, res) => {
    const { title, content, imageUrl, author } = req.body;
    const newNews = new News({ title, content, imageUrl, author });
    await newNews.save();
    res.status(201).json(newNews);
});

module.exports = router;