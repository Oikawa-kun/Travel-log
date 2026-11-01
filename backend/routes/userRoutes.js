const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/:userId', async (req, res) => {
  try {
    const User = require('../models/User');
    const Log = require('../models/Log');
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const logCount = await Log.countDocuments({ author: req.params.userId });
    res.json({ ...user.toObject(), logCount });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/profile/update', protect, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    const updated = await user.save();
    res.json({ _id: updated._id, name: updated.name, email: updated.email, bio: updated.bio });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
