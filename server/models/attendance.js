const mongoose = require("mongoose");


const AttendanceSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    required: true,
  },
  attendance: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("attendance", AttendanceSchema);