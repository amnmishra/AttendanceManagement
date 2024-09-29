const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Counter = require('./Counter');  // Import the Counter model

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  empId: {
    type: Number,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['SuperAdmin', 'Admin', 'Supervisor', 'Worker','Emplyee'],
    default: 'Employee',
  },
});

// Pre-save middleware to auto-generate empId
userSchema.pre('save', async function (next) {
  const user = this;

  // If empId is not already set, generate it
  if (!user.empId) {
    try {
      console.log('Generating empId...');
      
      // Fetch the current counter value and increment it
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'user_empId' }, // Counter ID for empId generation
        { $inc: { seq: 1 } },  // Increment the sequence by 1
        { new: true, upsert: true } // Create a new counter if it doesn't exist
      );

      // Assign the incremented sequence value to empId
      user.empId = counter.seq;
      console.log(`Generated empId: ${user.empId}`);
    } catch (error) {
      console.error('Error generating empId:', error);
      return next(error);
    }
  }

  // Validate empId
  if (!user.empId) {
    console.error('empId is null or undefined!');
    return next(new Error('empId generation failed'));
  }

  // Hash the password before saving the user, if the password was modified
  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
      console.error('Error hashing password:', error);
      return next(error);
    }
  }

  next();
});
module.exports = mongoose.model('User', userSchema);
