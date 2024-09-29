const express = require('express');
const { markAttendance, getAttendanceReport } = require('../controllers/attendanceController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Mark attendance (Supervisor only)
router.post('/mark', protect, authorizeRoles('SuperAdmin', 'Admin', 'Supervisor'), upload.single('photo'), markAttendance);

// Get attendance report (Super Admin only)
router.get('/report', protect, authorizeRoles('SuperAdmin'), getAttendanceReport);

module.exports = router;
