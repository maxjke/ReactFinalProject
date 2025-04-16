const express = require('express');
const router = express.Router();
const Computer = require('../models/Computer');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const computers = await Computer.find();
    res.json(computers);
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" });
  }
});


router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const computer = await Computer.findById(req.params.id);
    if (!computer) return res.status(404).json({ message: "Kompiuteris nerastas" });
    res.json(computer);
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  const { name, specs, available } = req.body;
  try {
    const computer = new Computer({ name, specs, available });
    await computer.save();
    res.status(201).json(computer);
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { name, specs, available } = req.body;
  try {
    let computer = await Computer.findById(req.params.id);
    if (!computer) return res.status(404).json({ message: "Kompiuteris nerastas" });
    computer.name = name || computer.name;
    computer.specs = specs || computer.specs;
    computer.available = available !== undefined ? available : computer.available;
    await computer.save();
    res.json(computer);
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const computer = await Computer.findById(req.params.id);
    if (!computer) return res.status(404).json({ message: "Kompiuteris nerastas" });
    await computer.remove();
    res.json({ message: "Kompiuteris ištrintas" });
  } catch (err) {
    res.status(500).json({ message: "Serverio klaida" });
  }
});

module.exports = router;
