const User = require('../models/User');

// Create Admin (Only Super Admin can do this)
exports.createRoles = async (req, res) => {
  if (req.user.role !== 'SuperAdmin') {
    return res.status(403).json({ message: 'Only SuperAdmin can create Admin' });
  }
  
  const { name , email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newAdmin = new User({ name , email, password, role });
    
    await newAdmin.save();

    res.status(201).json({ message: `${role} created successfully`, empId: newAdmin.empId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create Supervisor or Worker (Only Admin can do this)
exports.createEmployee = async (req, res) => {
  // Ensure only Admin can create employees
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Only Admin can create Employees' });
  }

  const { name , email, password, role } = req.body;

  // Ensure role is either Supervisor or Worker
  if (role !== 'Supervisor' && role !== 'Worker' && role !== 'Employee') {
    return res.status(400).json({ message: 'Invalid role. Must be Supervisor or Worker' });
  }

  try {
    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    // Create a new employee (empId will be auto-generated via pre-save middleware)
    const newEmployee = new User({
      name,
      email,
      password,
      role
    });

    await newEmployee.save();

    // Response to indicate success and return the empId
    res.status(201).json({ message: `${role} created successfully`, empId: newEmployee.empId });
  } catch (err) {
    // Log the error to identify what went wrong
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};









// Get all users (Only SuperAdmin can view this)
exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'SuperAdmin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
