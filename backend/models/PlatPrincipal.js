const mongoose = require('mongoose');

const platPrincipalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description:{ type: String, required: true },
});

const PlatPrincipal = mongoose.model('PlatPrincipal', platPrincipalSchema);

module.exports = PlatPrincipal;
