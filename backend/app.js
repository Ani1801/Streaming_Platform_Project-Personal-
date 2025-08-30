const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const profileRoutes = require('./routes/profile');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow all origins

// Middleware
app.use(express.json());

// MongoDB Connection (connecting to local database)
mongoose.connect("mongodb://127.0.0.1:27017/Streaming_Platform", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/auth", authRoutes);
app.use('/profile', profileRoutes); 

// Default Route for local development
app.get("/", (req, res) => {
  res.send("Welcome to Streaming Platform API 🚀");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;