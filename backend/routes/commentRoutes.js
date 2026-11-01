const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/:logId', protect, async (req, res) => {
  try {
    const Comment = require('../models/Comment');
    const Log = require('../models/Log');
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text required' });
    const log = await Log.findById(req.params.logId);
    if (!log) return res.status(404).json({ message: 'Log not found' });
    const comment = await Comment.create({
      text, author: req.user._id, log: req.params.logId,
    });
    await comment.populate('author', 'name profilePicture');
    res.status(201).json(comment);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:logId', async (req, res) => {
  try {
    const Comment = require('../models/Comment');
    const comments = await Comment.find({ log: req.params.logId })
      .populate('author', 'name profilePicture')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
