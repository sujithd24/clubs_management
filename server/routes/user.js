const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  checkUser
} = require("../controllers/user");

// CREATE a new user
router.post("/", createUser);

// READ all users
router.get("/", getAllUsers);

// READ a specific user by ID
router.get("/:id", getUserById);

// UPDATE a user by ID
router.put("/:id", updateUser);

// DELETE a user by ID
router.delete("/:id", deleteUser);

router.post("/login",checkUser)

module.exports = router;
