const express = require("express");
const db = require("../database");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

/* ADD SWEET (ADMIN ONLY) */
router.post("/", auth, admin, (req, res) => {
  const { name, category, price, quantity } = req.body;

  db.run(
    "INSERT INTO sweets VALUES (NULL, ?, ?, ?, ?)",
    [name, category, price, quantity],
    () => res.json({ message: "Sweet added" })
  );
});

/* GET ALL SWEETS */
router.get("/", auth, (req, res) => {
  db.all("SELECT * FROM sweets", [], (err, rows) => {
    res.json(rows);
  });
});

/* PURCHASE SWEET */
router.post("/:id/purchase", auth, (req, res) => {
  db.run(
    "UPDATE sweets SET quantity = quantity - 1 WHERE id=? AND quantity > 0",
    [req.params.id],
    () => res.json({ message: "Purchased" })
  );
});

/* RESTOCK SWEET (ADMIN ONLY) */
router.post("/:id/restock", auth, admin, (req, res) => {
  const { quantity } = req.body;

  db.run(
    "UPDATE sweets SET quantity = quantity + ? WHERE id=?",
    [quantity, req.params.id],
    () => res.json({ message: "Restocked" })
  );
});

/* DELETE SWEET (ADMIN ONLY) */
router.delete("/:id", auth, admin, (req, res) => {
  db.run(
    "DELETE FROM sweets WHERE id=?",
    [req.params.id],
    () => res.json({ message: "Deleted" })
  );
});

module.exports = router;
