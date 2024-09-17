const express = require("express");
const router = express.Router();
const Traiteur = require("../models/Traiteur");

// Route pour créer un nouveau Traiteur
router.post("/", async (req, res) => {
    const { firstName, lastName, phone, address } = req.body;

    try {
        const nouveauTraiteur = new Traiteur({
            firstName,
            lastName,
            phone,
            address,
        });

        const TraiteurEnregistre = await nouveauTraiteur.save();

        res.status(201).json(TraiteurEnregistre);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la création du Traiteur");
    }
});

// Route pour récupérer tous les Traiteurs
router.get("/", async (req, res) => {
    try {
        const Traiteurs = await Traiteur.find();
        res.json(Traiteurs);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération des Traiteurs");
    }
});

// Route pour récupérer un Traiteur par son ID
router.get("/:id", async (req, res) => {
    const TraiteurId = req.params.id;

    try {
        const Traiteur = await Traiteur.findById(TraiteurId);
        
        if (!Traiteur) {
            return res.status(404).json({ message: "Traiteur non trouvé" });
        }

        res.json(Traiteur);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération du Traiteur");
    }
});

// Route pour mettre à jour un Traiteur par son ID
router.put("/:id", async (req, res) => {
    const TraiteurId = req.params.id;

    try {
        const Traiteur = await Traiteur.findByIdAndUpdate(TraiteurId, req.body, { new: true });

        if (!Traiteur) {
            return res.status(404).json({ message: "Traiteur non trouvé" });
        }

        res.json(Traiteur);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la mise à jour du Traiteur");
    }
});

// Route pour supprimer un Traiteur par son ID
router.delete("/:id", async (req, res) => {
    const TraiteurId = req.params.id;

    try {
        const Traiteur = await Traiteur.findByIdAndDelete(TraiteurId);

        if (!Traiteur) {
            return res.status(404).json({ message: "Traiteur non trouvé" });
        }

        res.json({ message: "Traiteur supprimé avec succès" });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la suppression du Traiteur");
    }
});

module.exports = router;
