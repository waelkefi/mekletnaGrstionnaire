const express = require('express');
const router = express.Router();
const Circuit = require('../models/Circuit');
const User = require('../models/User');
// Route to get all circuits
router.get('/', async (req, res) => {
    try {
        const circuits = await Circuit.find().populate('livreur')
        .populate({
          path: 'commande',
          populate: [
            { path: 'plats.plat', model: 'plat' },
            { path: 'client', model: 'Client' },
            { path: 'traiteur', model: 'Traiteur' },
          ],
        });
        res.json(circuits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});

// Route to get a specific circuit by ID
router.get('/:id', async (req, res) => {
    try {
        const circuit = await Circuit.findById(req.params.id);
        if (!circuit) {
            return res.status(404).json({ message: 'Circuit not found' });
        }
        res.json(circuit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to create a new circuit
router.post('/', async (req, res) => {
    try {
        const newCircuit = new Circuit(req.body);
        const savedCircuit = await newCircuit.save();
        res.status(201).json(savedCircuit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to update a circuit by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedCircuit = await Circuit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCircuit) {
            return res.status(404).json({ message: 'Circuit not found' });
        }
        res.json(updatedCircuit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to delete a circuit by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCircuit = await Circuit.findOneAndDelete(req.params.id);
        if (!deletedCircuit) {
            return res.status(404).json({ message: 'Circuit not found' });
        }
        res.json({ message: 'Circuit deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route pour obtenir les circuits par date
router.get('/date/getByDate', async (req, res) => {
    const dateActuelle = new Date().toISOString().split('T')[0];
    try {
        const circuits = await Circuit.find({ date: dateActuelle }).populate('livreur')
        .populate({
          path: 'commande',
          populate: [
            { path: 'plats.plat', model: 'plat' },
            { path: 'client', model: 'Client' },
            { path: 'traiteur', model: 'Traiteur' },
          ],
        });
        res.json(circuits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});

router.get('/livreur/:livreurId', async (req, res) => {
    try {
    
        const circuits = await Circuit.find({ livreur: req.params.livreurId }).populate('livreur')
        .populate({
          path: 'commande',
          populate: [
            { path: 'plats.plat', model: 'plat' },
            { path: 'client', model: 'Client' },
            { path: 'traiteur', model: 'Traiteur' },
          ],
        });

        res.json(circuits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur du serveur' });
    }
});

module.exports = router;
