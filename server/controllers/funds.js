const Fund = require("../models/funds");

// CREATE a new fund
const createFund = async (req, res) => {
  try {
    const newFund = new Fund(req.body);
    const savedFund = await newFund.save();
    res.status(201).json(savedFund);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all funds
const getAllFunds = async (req, res) => {
  try {
    const funds = await Fund.find();
    res.status(200).json(funds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ a specific fund by ID
const getFundById = async (req, res) => {
  try {
    const fund = await Fund.findById(req.params.id);
    if (!fund) {
      return res.status(404).json({ error: "Fund not found" });
    }
    res.status(200).json(fund);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a fund by ID
const updateFund = async (req, res) => {
  try {
    const updatedFund = await Fund.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedFund) {
      return res.status(404).json({ error: "Fund not found" });
    }
    res.status(200).json(updatedFund);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a fund by ID
const deleteFund = async (req, res) => {
  try {
    const deletedFund = await Fund.findByIdAndDelete(req.params.id);
    if (!deletedFund) {
      return res.status(404).json({ error: "Fund not found" });
    }
    res.status(200).json({ message: "Fund deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createFund,
  getAllFunds,
  getFundById,
  updateFund,
  deleteFund,
};
