// PlanificationRoutes.js
const express = require('express');
const router = express.Router();
const Planification = require('../models/Planification');

// Create Planification
router.post('/', async (req, res) => {
    try {
        const { plat, date } = req.body;
        const newPlanification = new Planification({ plat, date });
        const savedPlanification = await newPlanification.save()
         // Renvoyez la planification populée en réponse
         const planificationPopulee = await Planification.findById(savedPlanification._id).populate({
            path: 'plat',
            populate: {
                path: 'traiteur'
            }
        });

        res.json(planificationPopulee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Read Planification
router.get('/', async (req, res) => {
    try {
        const planification = await Planification.find().populate({
            path: 'plat',
            populate: ({
                path: "traiteur",
            })
        });
        res.json(planification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Read Planification
router.get('/:id', async (req, res) => {
    try {
        const planification = await Planification.findById(req.params.id).populate({
            path: 'plat',
            populate: ({
                path: "traiteur",
            })
        });
        res.json(planification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Planification
router.put('/:id', async (req, res) => {
    try {
        const { plat, date } = req.body;
        const updatedPlanification = await Planification.findByIdAndUpdate(
            req.params.id,
            { plat, date },
            { new: true }
        );
        res.json(updatedPlanification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Planification
router.delete('/:id', async (req, res) => {
    try {
        await Planification.findByIdAndDelete(req.params.id);
        res.json({ message: 'Planification deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Planifications with Date
router.get('/date/:date', async (req, res) => {
    try {
        const planifications = await Planification.find({ date: req.params.date }).populate({
            path: 'plat',
            populate: ({
                path: "traiteur",
            })
        });
        res.json(planifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
