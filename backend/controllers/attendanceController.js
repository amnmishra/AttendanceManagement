const geoip = require('geoip-lite');
const Attendance = require('../models/Attendance');
const User = require('../models/User');

// Supervisor marks attendance

 
exports.markAttendance = async (req, res) => {
  if (req.user.role !== 'Supervisor') {
    return res.status(403).json({ message: 'Only Supervisors can mark attendance' });
  }

  const { empId } = req.body;
  const { photo } = req.file; // Assume you're handling file uploads with middleware

  try {
    // Get worker information
    const worker = await User.findOne({ empId: empId });
    // res.json(worker)

    if (!empId || worker.role !== 'Worker') {
      return res.status(400).json({ message: 'Invalid Emplyee ID' });
    }


    // Create attendance record with location data
    const newAttendance = new Attendance({
      supervisor: req.user._id,
      empId: worker._id,
      location: {
        latitude:27.13290088550712,
        longitude:81.96781392740444
      },
      photo: req.file.path, // Path to the uploaded photo
    });

    await newAttendance.save();
    res.status(201).json({ message: 'Attendance marked successfully', attendance: newAttendance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};









// Super Admin gets attendance report
exports.getAttendanceReport = async (req, res) => {
  if (req.user.role !== 'SuperAdmin') {
    return res.status(403).json({ message: 'Only SuperAdmins can view attendance reports' });
  }
  try {
    const attendanceRecords = await Attendance.find()
      .populate('worker', 'name')
      .populate('supervisor', 'name');
    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
