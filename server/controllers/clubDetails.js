const ClubDetail = require("../models/clubDetail");

// Create a new club detail
exports.createClub = async (req, res) => {
  try {
    const club = new ClubDetail(req.body);
    await club.save();
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all clubs
exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await ClubDetail.find();
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByFaculty = async (req,res)=>{
  const faculty = req.query.faculty;
  try{
    const clubs = await ClubDetail.find({$or: [{ clubIncharge1: faculty }, { clubIncharge2: faculty }]});
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a single club by ID
exports.getClubById = async (req, res) => {
  try {
    const club = await ClubDetail.findById(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });
    res.status(200).json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a club by ID
exports.updateClub = async (req, res) => {
  try {
    const club = await ClubDetail.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!club) return res.status(404).json({ message: "Club not found" });
    res.status(200).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a club by ID
exports.deleteClub = async (req, res) => {
  try {
    const club = await ClubDetail.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ message: "Club not found" });
    res.status(200).json({ message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
