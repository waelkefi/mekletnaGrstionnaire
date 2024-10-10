const express = require('express');
const router = express.Router();
const Accompagnement = require('../models/Accompagnement');
const uploadMulter = require("../middleware/upload");
const validation = require("../middleware/validation");
// GET all accompagnements
router.get('/', async (req, res) => {
  try {
    const accompagnements = await Accompagnement.find().populate('compatibleDishes', 'name');
    res.json(accompagnements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new accompagnement
router.post('/',uploadMulter, validation, async (req, res) => {
  
  console.log('acc', req.body )
  const accompagnement = new Accompagnement({
    name: req.body.name,
    image:  req.file.path,
    price: req.body.price,
    description: req.body.description,
    compatibleDishes: req.body.compatibleDishes, // array of plat principal IDs
  });
  
  try {
    const newAccompagnement = await accompagnement.save();
    res.status(201).json(newAccompagnement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an accompagnement
router.delete('/:id', async (req, res) => {
  try {
    await Accompagnement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Accompagnement deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
