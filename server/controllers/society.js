const Society = require("../models/society");

// CREATE a new society
const createSociety = async (req, res) => {
  try {
    const newSociety = new Society(req.body);
    const savedSociety = await newSociety.save();
    res.status(201).json(savedSociety);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all societies
const getAllSocieties = async (req, res) => {
  try {
    const societies = await Society.find();
    res.status(200).json(societies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ a specific society by ID
const getSocietyById = async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (!society) {
      return res.status(404).json({ error: "Society not found" });
    }
    res.status(200).json(society);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a society by ID
const updateSociety = async (req, res) => {
  try {
    const updatedSociety = await Society.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSociety) {
      return res.status(404).json({ error: "Society not found" });
    }
    res.status(200).json(updatedSociety);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a society by ID
const deleteSociety = async (req, res) => {
  try {
    const deletedSociety = await Society.findByIdAndDelete(req.params.id);
    if (!deletedSociety) {
      return res.status(404).json({ error: "Society not found" });
    }
    res.status(200).json({ message: "Society deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSociety,
  getAllSocieties,
  getSocietyById,
  updateSociety,
  deleteSociety,
};
