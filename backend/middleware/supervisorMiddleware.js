const roles = require('../config/roles');

exports.supervisorOnly = (req, res, next) => {
  if (req.user.role !== roles.SUPERVISOR) {
    return res.status(403).json({ message: 'Access denied. Supervisor only.' });
  }
  next();
};
