const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-double")(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const PlatSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  disponibilite: {
    type: Boolean,
    default: true,
  },
  traiteur: {
    type: Schema.Types.ObjectId,
    ref: "Traiteur",
    required: true,
  },
  image: { type: String, trim: true },
  description: {
    type: String,
  },
});
module.exports = Plat = mongoose.model("plat", PlatSchema);