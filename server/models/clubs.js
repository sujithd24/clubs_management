const mongoose = require("mongoose");


const ClubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
   clubIncharge: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  monthlyEventNumber: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("Club", ClubSchema);