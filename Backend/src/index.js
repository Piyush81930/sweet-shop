const express = require("express");
const cors = require("cors");

// Import database (important to initialize tables)
require("./database");

// Import routes
const authRoutes = require("./routes/auth");
const sweetRoutes = require("./routes/sweets");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Sweet Shop API Running");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

