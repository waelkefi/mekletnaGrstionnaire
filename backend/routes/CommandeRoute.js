const express = require("express");
const router = express.Router();
const Commande = require("../models/Commande");

// Route pour créer une nouvelle commande
router.post("/", async (req, res) => {
    const {
        plats,
        traiteur,
        amount,
        address,
        client,
        delivery_status,
        date,
        time
    } = req.body;

    try {
        const nouvelleCommande = new Commande({
            plats,
            traiteur,
            amount,
            address,
            client,
            delivery_status,
            date,
            time
        });

        const commandeEnregistree = await nouvelleCommande.save();

        const commandePopulee = await Commande.findById(commandeEnregistree._id).populate('client');

        res.status(201).json(commandePopulee);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la création de la commande");
    }
});

// Route pour récupérer toutes les commandes
router.get("/", async (req, res) => {
    try {
        const commandes = await Commande.find().populate("plats.plat traiteur client");
        res.json(commandes);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération des commandes");
    }
});

// Route pour récupérer une commande par son ID
router.get("/:id", async (req, res) => {
    const commandeId = req.params.id;

    try {
        const commande = await Commande.findById(commandeId).populate("plats.plat traiteur client");

        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        res.json(commande);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération de la commande");
    }
});

// Route pour mettre à jour une commande par son ID
router.put("/:id", async (req, res) => {
    const commandeId = req.params.id;

    try {
        const commande = await Commande.findByIdAndUpdate(commandeId, req.body, { new: true }).populate("plats.plat traiteur client");

        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        res.json(commande);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la mise à jour de la commande");
    }
});

// Route pour supprimer une commande par son ID
router.delete("/:id", async (req, res) => {
    const commandeId = req.params.id;

    try {
        const commande = await Commande.findOneAndDelete(commandeId);

        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        res.json({ message: "Commande supprimée avec succès" });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la suppression de la commande");
    }
});

router.put("/updateCommande/markDelivered", (req, res) => {
    let { delivery_id } = req.body;
    Commande.findOneAndUpdate({ _id: delivery_id }, {
      delivery_date: new Date(),
      delivery_status: "DELIVERED"
    }, { new: true })
      .then(() => res.json(true))
      .catch((err) => res.send(err));
  });


  router.get("/getCommandeByTraiteurAndDate/:querry", async (req, res) => {
    const traiteurId = req.params.querry.toString();  // Utilisez query pour obtenir le traiteur depuis l'URL
    const dateActuelle = new Date().toISOString().split('T')[0];  // Obtenez la date actuelle au format YYYY-MM-DD

    try {
        const commandes = await Commande.find({
            traiteur: traiteurId,
             date: dateActuelle
        }).populate("plats.plat traiteur client");

        res.json(commandes);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération des commandes par traiteur et date");
    }
});

module.exports = router;
