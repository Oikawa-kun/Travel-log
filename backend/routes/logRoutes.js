const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { protect } = require("../middleware/authMiddleware");

// Make sure the uploads folder exists (backend/uploads)
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

router.get("/", async (req, res) => {
  try {
    const Log = require("../models/Log");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const total = await Log.countDocuments();
    const logs = await Log.find()
      .populate("author", "name profilePicture")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.json({ logs, page, totalPages: Math.ceil(total / limit), total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", protect, upload.array("photos", 5), async (req, res) => {
  try {
    const Log = require("../models/Log");
    const { title, destination, date, description, rating, tags } = req.body;
    if (!title || !destination || !date || !description) {
      return res.status(400).json({ message: "All fields required" });
    }
    const photoPaths = req.files
      ? req.files.map((f) => `/uploads/${f.filename}`)
      : [];
    const log = await Log.create({
      title,
      destination,
      date,
      description,
      rating: rating || 3,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      photos: photoPaths,
      author: req.user._id,
    });
    await log.populate("author", "name profilePicture");
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const Log = require("../models/Log");
    const logs = await Log.find({ author: req.params.userId })
      .populate("author", "name profilePicture")
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const Log = require("../models/Log");
    const log = await Log.findById(req.params.id).populate(
      "author",
      "name profilePicture",
    );
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", protect, upload.array("photos", 5), async (req, res) => {
  try {
    const Log = require("../models/Log");
    const log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    if (log.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const { title, destination, date, description, rating, tags } = req.body;
    log.title = title || log.title;
    log.destination = destination || log.destination;
    log.date = date || log.date;
    log.description = description || log.description;
    log.rating = rating || log.rating;
    log.tags = tags ? tags.split(",").map((t) => t.trim()) : log.tags;
    if (req.files && req.files.length > 0) {
      log.photos = req.files.map((f) => `/uploads/${f.filename}`);
    }
    const updated = await log.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const Log = require("../models/Log");
    const log = await Log.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    if (log.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await log.deleteOne();
    res.json({ message: "Log deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
