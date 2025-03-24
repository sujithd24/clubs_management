const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance");

router.post("/", attendanceController.createAttendance);
router.get("/", attendanceController.getAllAttendance);
router.get("/:id", attendanceController.getAttendanceById);
router.put("/:id", attendanceController.updateAttendance);
router.delete("/:id", attendanceController.deleteAttendance);
router.post("/markAttendance", attendanceController.markAttendance);
module.exports = router;
