const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// Route pour créer un nouveau client
router.post("/", async (req, res) => {
    const { name, phone, address } = req.body;

    try {
        let client = await Client.findOne({ phone });

        if (client) {
            // Le client existe, vérifier si l'adresse doit être mise à jour
            if (address.country !== client.address.country ||
                address.state !== client.address.state ||
                address.streetBuilding !== client.address.streetBuilding ||
                address.latitude !== client.address.latitude ||
                address.longitude !== client.address.longitude) {
                
                // Mettre à jour l'adresse si elle est différente
                client.address = address;
                await client.save();
                return res.status(200).send(client);
            } else {
                // L'adresse est la même
                return res.status(200).send(client);
            }
        } else {
            // Le client n'existe pas, créer un nouveau client
            const nouveauClient = new Client({
                name,
                phone,
                address,
            });

            const clientEnregistre = await nouveauClient.save();
            return res.status(201).json(clientEnregistre);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Erreur du serveur lors de la création ou de la mise à jour du client");
    }
});


// Route pour récupérer tous les clients
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération des clients");
    }
});

// Route pour récupérer un client par son ID
router.get("/:id", async (req, res) => {
    const clientId = req.params.id;

    try {
        const client = await Client.findById(clientId);

        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        res.json(client);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la récupération du client");
    }
});

// Route pour mettre à jour un client par son ID
router.put("/:id", async (req, res) => {
    const clientId = req.params.id;

    try {
        const client = await Client.findByIdAndUpdate(clientId, req.body, { new: true });

        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        res.json(client);

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la mise à jour du client");
    }
});

// Route pour supprimer un client par son ID
router.delete("/:id", async (req, res) => {
    const clientId = req.params.id;

    try {
        const client = await Client.findByIdAndDelete(clientId);

        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }

        res.json({ message: "Client supprimé avec succès" });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur lors de la suppression du client");
    }
});

module.exports = router;
