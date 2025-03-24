const mongoose = require("mongoose");


const FeedbackSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Feedback", FeedbackSchema);