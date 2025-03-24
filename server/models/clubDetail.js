const mongoose = require("mongoose");


const ClubDetailSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
  clubContent:{
    type:String,
    required:true,
  },
   clubIncharge1: {
    type: String,
    required: true,
  } ,
  clubIncharge2: {
    type: String,
    required: false,
  },
  clubIncharge1img:{
    type:String,
    required:true,
  },
  clubIncharge2img:{
    type:String,
    required:false,
  },
});


module.exports = mongoose.model("ClubDetail", ClubDetailSchema);