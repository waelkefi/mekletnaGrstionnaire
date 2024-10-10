const mongoose = require('mongoose');

const commandeEventSchema = new mongoose.Schema({
  platPrincipal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlatPrincipal',
    required: true
  },
  accompagnements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accompagnement',
    required: true
  }],
  client: {
    nom: { type: String, required: true },
    telephone: { type: String, required: true },
    ville: { type: String, required: true },
    rue: { type: String, required: true },
  },
  dateLivraison: { type: Date, required: true },
  timeLivraison: { type: String, required: true },
  quantite: { type: Number, required: true },
  prixPlat: { type: Number, required: true } // Virgule manquante ajoutée ici
});

const CommandeEvent = mongoose.model('CommandeEvent', commandeEventSchema);

module.exports = CommandeEvent;
