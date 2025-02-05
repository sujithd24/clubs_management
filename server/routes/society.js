const express = require("express");
const router = express.Router();
const {
  createSociety,
  getAllSocieties,
  getSocietyById,
  updateSociety,
  deleteSociety,
} = require("../controllers/society");

// CREATE a new society
router.post("/", createSociety);

// READ all societies
router.get("/", getAllSocieties);

// READ a specific society by ID
router.get("/:id", getSocietyById);

// UPDATE a society by ID
router.put("/:id", updateSociety);

// DELETE a society by ID
router.delete("/:id", deleteSociety);

module.exports = router;
