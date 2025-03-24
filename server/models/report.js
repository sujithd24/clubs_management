const mongoose = require("mongoose");


const ReportSchema = new mongoose.Schema({
  Participations: {
    type: String,
    required: true,
  },
  clubName: {
    type: String,
    required: true,
  },
  MonthlyEvents: {
    type: String,
    required: true,
  },
  Performance: {
    type: Number,
    required: true,
  },
  docFiles: {
    type: String,
  },
});


module.exports = mongoose.model("Report", ReportSchema);