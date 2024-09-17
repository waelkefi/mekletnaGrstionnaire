const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        country: { type: String, required: true },
        state: { type: String, required: true },
        streetBuilding: { type: String, required: true },
        latitude: { type: Number,},
        longitude: { type: Number,}
    }

});
module.exports = Client = mongoose.model("Client", clientSchema);


