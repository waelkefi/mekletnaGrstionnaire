const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSocketSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
  token: {
    type: String
  },

});
module.exports = UserSocket = mongoose.model("UserSocket", userSocketSchema);