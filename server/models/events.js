const mongoose = require("mongoose");


const EventSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
   eventName: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  activities: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Events", EventSchema);