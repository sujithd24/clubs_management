const express = require("express");
const router = express.Router();
const {
  createFund,
  getAllFunds,
  getFundById,
  updateFund,
  deleteFund,
} = require("../controllers/funds");

// CREATE a new fund
router.post("/", createFund);

// READ all funds
router.get("/", getAllFunds);

// READ a specific fund by ID
router.get("/:id", getFundById);

// UPDATE a fund by ID
router.put("/:id", updateFund);

// DELETE a fund by ID
router.delete("/:id", deleteFund);

module.exports = router;
