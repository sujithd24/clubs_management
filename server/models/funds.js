const mongoose = require("mongoose");


const FundSchema = new mongoose.Schema({
  totalFund: {
    type: Number,
    required: true,
  },
  clubName: {
    type: String,
    required: true,
  },
  usedFund: {
    type: Number,
    required: true,
  },
  remainingFund: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model("Fund", FundSchema);