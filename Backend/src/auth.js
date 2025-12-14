const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database");

const router = express.Router();
const SECRET = "secretkey";

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hashed = bcrypt.hashSync(password, 8);

  db.run(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashed, "user"],
    err => {
      if (err) return res.status(400).json(err);
      res.json({ message: "User registered" });
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email=?", [email], (err, user) => {
    if (!user) return res.status(401).json({ message: "Invalid" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET);
    res.json({ token });
  });
});

module.exports = router;
