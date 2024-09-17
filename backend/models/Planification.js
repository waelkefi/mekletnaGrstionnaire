const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PlanificationSchema = new Schema({
  
  plat: {
    type: Schema.Types.ObjectId,
    ref: "plat",
    required: true,
  },
  date : {
    type: Date,
    required : true
  }
});
module.exports = Planification = mongoose.model("Planification", PlanificationSchema);