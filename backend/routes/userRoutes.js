const express = require('express');
const { createRoles, createEmployee, getAllUsers } = require('../controllers/userController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Create Admin (Super Admin only)
router.post('/createRoles', protect, authorizeRoles('SuperAdmin'), createRoles);

// Create Supervisor or Worker (Admin only)
router.post('/createEmployee', protect, authorizeRoles('Admin'), createEmployee);

// Get all users (Super Admin only)
router.get('/getAllUsers', protect, authorizeRoles('SuperAdmin'), getAllUsers);

module.exports = router;
