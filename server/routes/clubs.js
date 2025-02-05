const express = require("express");
const router = express.Router();
const {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
} = require("../controllers/clubs");

// CREATE a new club
router.post("/", createClub);

// READ all clubs
router.get("/", getAllClubs);

// READ a specific club by ID
router.get("/:id", getClubById);

// UPDATE a club by ID
router.put("/:id", updateClub);

// DELETE a club by ID
router.delete("/:id", deleteClub);

module.exports = router;
