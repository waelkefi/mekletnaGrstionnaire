const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const envieClientSchema = new Schema({
    plat: {
        type: String, required: true
    },
    client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
},
    { timestamps: true }
);
module.exports = EnvieClient = mongoose.model("EnvieClient", envieClientSchema);