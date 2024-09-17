const express = require('express');
const router = express.Router();
const EnvieClient = require('../models/EnvieClient');


router.post('/', async (req, res) => {
    try {
        const nouvelEnvieClient = new EnvieClient(req.body);
        const enregistrement = await nouvelEnvieClient.save();
        const enviePopulee = await EnvieClient.findById(enregistrement._id).populate('client');
        res.json(enviePopulee);
    } catch (erreur) {
        res.status(400).json({ message: erreur.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const envieClients = await EnvieClient.find().populate('client');
        res.json(envieClients);
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const envieClient = await EnvieClient.findById(req.params.id).populate('client');
        if (!envieClient) {
            return res.status(404).json({ message: 'Enregistrement non trouvé' });
        }
        res.json(envieClient);
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const envieClient = await EnvieClient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!envieClient) {
            return res.status(404).json({ message: 'Enregistrement non trouvé' });
        }
        res.json(envieClient);
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const envieClient = await EnvieClient.findByIdAndDelete(req.params.id);
        if (!envieClient) {
            return res.status(404).json({ message: 'Enregistrement non trouvé' });
        }
        res.json({ message: 'Enregistrement supprimé avec succès' });
    } catch (erreur) {
        res.status(500).json({ message: erreur.message });
    }
});

router.get("/plats/all", async (req, res) => {
    try {
        const plats = await EnvieClient.aggregate([
            {
                $group: {
                    _id: "$plat"
                }
            },
            {
                $project: {
                    _id: 0,
                    plat: "$_id"
                }
            }
        ]);

        res.status(200).json(plats);
    } catch (error) {
        res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des plats." });
    }
});

module.exports = router;
