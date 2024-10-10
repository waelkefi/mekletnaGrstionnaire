const express = require('express');
const router = express.Router();
const Commande = require('../models/CommandeEvent');

// Créer une nouvelle commande
router.post('/', async (req, res) => {
  try {
console.log('commandeEvent')
    const { platPrincipal, accompagnements, client, dateLivraison, quantite,timeLivraison, prixPlat } = req.body;

    const nouvelleCommande = new Commande({
      platPrincipal,
      accompagnements,
      client,
      dateLivraison,
      quantite,
      timeLivraison,

      prixPlat
    });
    await nouvelleCommande.save();

    res.status(201).json({ message: 'Commande créée avec succès', commande: nouvelleCommande });
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la commande' });
  }
});

// Récupérer toutes les commandes
router.get('/', async (req, res) => {
  console.log('wael is here')
  try {
    const commandes = await Commande.find().populate('platPrincipal').populate('accompagnements');
    res.status(200).json(commandes);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
});

// Récupérer une commande par ID
router.get('/:id', async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id).populate('platPrincipal').populate('accompagnements');
    
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.status(200).json(commande);
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la commande' });
  }
});

// Supprimer une commande
router.delete('/:id', async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    
    if (!commande) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.status(200).json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la commande:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la commande' });
  }
});

module.exports = router;
