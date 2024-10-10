const mongoose = require('mongoose');

const accompagnementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description:{ type: String, required: true },
  compatibleDishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PlatPrincipal', required: true }],
});

const Accompagnement = mongoose.model('Accompagnement', accompagnementSchema);

module.exports = Accompagnement;
