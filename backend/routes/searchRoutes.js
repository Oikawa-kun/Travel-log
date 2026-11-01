const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const Log = require('../models/Log');
    const { q, tag } = req.query;
    const query = {};
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { destination: { $regex: q, $options: 'i' } },
      ];
    }
    if (tag) query.tags = { $in: [tag.toLowerCase()] };
    const logs = await Log.find(query)
      .populate('author', 'name profilePicture')
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
