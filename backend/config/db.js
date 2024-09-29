const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://kk:Attendance0101%23@attendanceapp.bq02n.mongodb.net/?retryWrites=true&w=majority&appName=AttendanceApp');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
