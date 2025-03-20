const Feedback = require("../models/feedback");

// 📌 Create Feedback
exports.createFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved successfully!", feedback: newFeedback });
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Error saving feedback", details: error.message });
  }
};

// 📌 Get All Feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find();
    if (feedbackList.length === 0) {
      return res.status(404).json({ message: "No feedback found" });
    }
    res.status(200).json(feedbackList);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Error fetching feedback", details: error.message });
  }
};

// 📌 Get Single Feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error fetching feedback by ID:", error);
    res.status(500).json({ error: "Error fetching feedback", details: error.message });
  }
};

// 📌 Update Feedback by ID
exports.updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback updated successfully", feedback: updatedFeedback });
  } catch (error) {
    console.error("Error updating feedback:", error);
    res.status(500).json({ error: "Error updating feedback", details: error.message });
  }
};

// 📌 Delete Feedback by ID
exports.deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    res.status(500).json({ error: "Error deleting feedback", details: error.message });
  }
};
