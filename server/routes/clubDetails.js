const express = require("express");
const ClubController = require("../controllers/clubDetails");

const router = express.Router();

// Define routes
router.post("/", ClubController.createClub);
router.get("/byfaculty", ClubController.getByFaculty);
router.get("/", ClubController.getAllClubs);
router.get("/:id", ClubController.getClubById);
router.put("/:id", ClubController.updateClub);
router.delete("/:id", ClubController.deleteClub);

module.exports = router;
