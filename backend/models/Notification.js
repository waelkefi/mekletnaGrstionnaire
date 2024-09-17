const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    message: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isRead: { type: Boolean, default: false },
    visited: { type: Boolean, default: false },
    date: {
      type: Date,
      default: Date.now,
      required: true
    },
    livraison: {
      type: Schema.Types.ObjectId,
      ref: "Livraison",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);