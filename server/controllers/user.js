const User = require("../models/user");
const bcrypt = require('bcrypt');

// CREATE a new user
const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      userid: req.body.userid,
      username: req.body.username,
      usertype: req.body.usertype,
      password: hashedPassword,
      email: req.body.email
    });

    await newUser.save();
    res.status(201).send("User saved");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// READ all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// READ a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// UPDATE a user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// DELETE a user by ID
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).send({ message: "User deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

checkUser = async(req,res) => {
  User.findOne({ username: req.body.username }).then(
      async(users) => {
          const isMatch = await bcrypt.compare(req.body.password, users.password)
          if(isMatch){
              req.session.user = {
                  usertype:users.usertype,
                  username:users.username,
                  
              };
              res.status(200).send({
                  "message":"loged in successfull",
                  "usertype":users.usertype,
                  "username":users.username
              })
          } else {
              res.status(401).send("password wrong")
          }
      }
  ).catch(
      (e)=>{
          res.status(404).send('User not found'); 
  })
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  checkUser,
};
