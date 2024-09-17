const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commandeSchema = new Schema({
    
        plats: [
          {
            plat: { type: Schema.Types.ObjectId, ref: "plat" },
            quantity: {
              type: Number,
              required: true
            },
            remarque: { type: String }
          },
        ],
        traiteur: { type: Schema.Types.ObjectId, ref: "Traiteur", required: true },
        amount: { type: Number, required: true },
    

        client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
        delivery_status: {
          type: String,
          enum: ["PENDING", "DELIVERED"],
          default: "PENDING"
        },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        
      },
      { timestamps: true }
    );;
module.exports = Commande = mongoose.model("Commande", commandeSchema);