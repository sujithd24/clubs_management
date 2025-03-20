const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback");

// ✅ Create Feedback
router.post("/", feedbackController.createFeedback);

// ✅ Get All Feedback
router.get("/", feedbackController.getAllFeedback);

// ✅ Get Single Feedback by ID
router.get("/:id", feedbackController.getFeedbackById);

// ✅ Update Feedback
router.put("/:id", feedbackController.updateFeedback);

// ✅ Delete Feedback
router.delete("/:id", feedbackController.deleteFeedback);

module.exports = router;
