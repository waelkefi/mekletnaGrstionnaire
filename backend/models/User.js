const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    email: {
        type: String,
        //required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN", "CLIENT", "TRAITEUR", "LIVREUR","GESTIONAIRE"],
        default: "GESTIONAIRE"
    },
    address: {
        country: { type: String, required: true },
        state: { type: String, required: true },
        streetBuilding: { type: String, required: true },
        latitude: { type: Number},
        longitude: { type: Number}
    }

});
module.exports = User = mongoose.model("User", userSchema);