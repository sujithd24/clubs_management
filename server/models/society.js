const mongoose = require("mongoose");


const SocietySchema = new mongoose.Schema({
  societyName: {
    type: String,
    required: true,
  },
   societyIncharge: {
    type: String,
    required: true,
  },
  societyName: {
    type: String,
    required: true,
  },
  monthlyEventNumber: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("Society", SocietySchema);