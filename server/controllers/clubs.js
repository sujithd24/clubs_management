const Club = require("../models/clubs");

// CREATE a new club
const createClub = async (req, res) => {
  try {
    const newClub = new Club(req.body);
    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ all clubs
const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ a specific club by ID
const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.status(200).json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a club by ID
const updateClub = async (req, res) => {
  try {
    const updatedClub = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedClub) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.status(200).json(updatedClub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a club by ID
const deleteClub = async (req, res) => {
  try {
    const deletedClub = await Club.findByIdAndDelete(req.params.id);
    if (!deletedClub) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.status(200).json({ message: "Club deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
};
