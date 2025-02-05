const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  userid:{
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    require: true
  },
  email:{
    type: String,
    require: true
  }
});


module.exports = mongoose.model("User", UserSchema);