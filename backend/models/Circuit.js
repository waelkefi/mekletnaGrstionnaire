const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const circuitSchema = new Schema({

    commande: [{ type: Schema.Types.ObjectId, ref: "Commande", required: true }],
    livreur: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    coordinates: [{
        lat: { type: Number, required :true},
        lng: { type: Number, required :true }
    }]
},
    { timestamps: true }
);;
module.exports = Circuit = mongoose.model("Circuit", circuitSchema);