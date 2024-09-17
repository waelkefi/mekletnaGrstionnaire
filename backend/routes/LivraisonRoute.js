const express = require("express");
const router = express.Router();
const Livraison = require("../models/Livraison");

// Route pour créer une nouvelle livraison
router.post("/", async (req, res) => {
    const {
        livreur,
        date,
        time,
        circuit,
    } = req.body;

    try {
        const nouvelleLivraison = new Livraison({
            livreur,
            date,
            time,
            circuit,
        });

        const livraisonEnregistree = await nouvelleLivraison.save();

        res.status(201).json(livraisonEnregistree);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la création de la livraisons");
    }
});

// Route pour récupérer toutes les livraison
router.get("/all", async (req, res) => {
    try {
        const livraisons = await Livraison.find().populate("circuit");
        res.json(livraisons);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération des livraisons");
    }
});

// Route pour récupérer toutes les livraisons by livreur and date
router.get("/byDeliveryAndDateNow", async (req, res) => {
    try {

        const livreur = req.query.livreur;
        const targetDate = new Date(req.query.date);

        // Extract year, month, and day from the target date
        const year = targetDate.getFullYear();
        const month = targetDate.getMonth() + 1; // Months are zero-based, so adding 1
        const day = targetDate.getDate();
        const livraisons = await Livraison.find({
            livreur: livreur,
            $expr: {
                $and: [
                    { $eq: [{ $year: "$date" }, year] },
                    { $eq: [{ $month: "$date" }, month] },
                    { $eq: [{ $dayOfMonth: "$date" }, day] }
                ]
            }
        })
        .populate({
            path: 'circuit',
            populate: [
              { path: 'plats.plat', model: Plat }, // Populate the 'plat' field inside 'circuit' with Plat documents
              { path: 'client', model: User }, // Populate the 'client' field inside 'circuit' with Client documents
              { path: 'traiteur', model: User }, // Populate the 'traiteur' field inside 'circuit' with Traiteur documents
            ],
          })
        res.send(livraisons);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération des livraisons");
    }
});

// Route pour récupérer toutes les livraisons by livreur and 7 days later
router.get("/byDelivery", async (req, res) => {
    try {

        const livreur = req.query.livreur;
        var today = new Date();  // Get current date
        today.setHours(0, 0, 0, 0);  // Set time to midnight for accurate comparison
        var sevenDaysLater = new Date();
        sevenDaysLater.setDate(today.getDate() + 7);
        // Add 7 days
        sevenDaysLater.setHours(23, 59, 59, 999);

        const livraisons = await Livraison.find({
            livreur: livreur,
            $expr: {
            $and: [
                { $gte: ["$date", today] },
                { $lt: ["$date", sevenDaysLater] }
              ]
            }
        })
        .populate({
            path: 'circuit',
            populate: [
              { path: 'plats.plat', model: Plat }, // Populate the 'plat' field inside 'circuit' with Plat documents
              { path: 'client', model: User }, // Populate the 'client' field inside 'circuit' with Client documents
              { path: 'traiteur', model: User }, // Populate the 'traiteur' field inside 'circuit' with Traiteur documents
            ],
          })
        res.send(livraisons);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération des livraisons");
    }
});

// Route pour récupérer une livraison par son ID
router.get("/:id", async (req, res) => {
    const livraisonId = req.params.id;

    try {
        const livraison = await Livraison.findById(livraisonId)
        .populate({
            path: 'circuit',
            populate: [
              { path: 'plats.plat', model: Plat }, // Populate the 'plat' field inside 'circuit' with Plat documents
              { path: 'client', model: User }, // Populate the 'client' field inside 'circuit' with Client documents
              { path: 'traiteur', model: User }, // Populate the 'traiteur' field inside 'circuit' with Traiteur documents
            ],
          })

        if (!livraison) {
            return res.status(404).json({ message: "livraison non trouvée" });
        }

        res.json(livraison);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération de la livraison");
    }
});

// Route pour mettre à jour une livraison par son ID
router.put("/:id", async (req, res) => {
    const livraisonId = req.params.id;

    try {
        const livraison = await Livraison.findByIdAndUpdate(livraisonId, req.body, { new: true }).populate("circuit");

        if (!livraison) {
            return res.status(404).json({ message: "livraison non trouvée" });
        }

        res.json(livraison);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la mise à jour de la livraison");
    }
});

// Route pour supprimer une livraison par son ID
router.delete("/:id", async (req, res) => {
    const livraisonId = req.params.id;

    try {
        const livraison = await Livraison.findByIdAndDelete(livraisonId);

        if (!livraison) {
            return res.status(404).json({ message: "livraison non trouvée" });
        }

        res.json({ message: "livraison supprimée avec succès" });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la suppression de la livraison");
    }
});

module.exports = router;
