const express = require('express');
const router = express.Router();
const PlatPrincipal = require('../models/PlatPrincipal');
const uploadMulter = require("../middleware/upload");
const validation = require("../middleware/validation");
// GET all plats principaux
router.get('/', async (req, res) => {
  try {
    const plats = await PlatPrincipal.find();
    res.json(plats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new plat principal
router.post('/',uploadMulter, validation, async (req, res) => {
  const plat = new PlatPrincipal({
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    description:req.body.description,
    image : req.file.path
  });

  try {
    const newPlat = await plat.save();
    res.status(201).json(newPlat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a plat principal
router.delete('/:id', async (req, res) => {
  try {
    await PlatPrincipal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plat deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
