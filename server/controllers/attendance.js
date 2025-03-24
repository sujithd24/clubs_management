const Attendance = require("../models/attendance");

// Create Attendance Entry
exports.createAttendance = async (req, res) => {
  try {
    const newAttendance = new Attendance(req.body);
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Read All Attendance Records
exports.getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read a Single Attendance Record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id);
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Attendance Record by ID
exports.updateAttendance = async (req, res) => {
  try {
    const updatedRecord = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecord) return res.status(404).json({ error: "Record not found" });
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Attendance Record by ID
exports.deleteAttendance = async (req, res) => {
  try {
    const deletedRecord = await Attendance.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ error: "Record not found" });
    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.markAttendance = async (req, res) => {
  try {
    const { name, rollNumber, clubName, eventName } = req.body;

    if (!name || !rollNumber || !clubName || !eventName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let record = await Attendance.findOne({ rollno: rollNumber, eventName });

    if (record) {
      record.attendance = "Present";
      await record.save();
    } else {
      record = new Attendance({ name, rollno: rollNumber, clubName, eventName, attendance: "Present" });
      await record.save();
    }

    res.status(200).json({ message: "Attendance marked successfully", record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};