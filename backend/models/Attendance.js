const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  attendanceDate: {
    type: Date,
    default: () => new Date(),  // Use Date to capture both date and time
  },
  photo: {
    type: String, 
    required: true,
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['Present', 'Absent','Leave'],
    default: 'Present',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);

  
