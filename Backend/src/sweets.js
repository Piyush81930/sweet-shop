const express = require("express");
const db = require("../database");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, (req, res) => {
  const { name, category, price, quantity } = req.body;
  db.run(
    "INSERT INTO sweets VALUES (NULL, ?, ?, ?, ?)",
    [name, category, price, quantity],
    () => res.json({ message: "Sweet added" })
  );
});

router.get("/", auth, (req, res) => {
  db.all("SELECT * FROM sweets", [], (err, rows) => res.json(rows));
});

router.post("/:id/purchase", auth, (req, res) => {
  db.run(
    "UPDATE sweets SET quantity = quantity - 1 WHERE id=? AND quantity > 0",
    [req.params.id],
    () => res.json({ message: "Purchased" })
  );
});

module.exports = router;
