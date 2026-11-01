require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());

// Serve uploaded photos statically so the frontend can load them via
// http://localhost:8000/uploads/<filename>
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
