const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
});

// taskSchema.pre('save', async function(next) {
//   const task = this; // for clarity
//
//   if (task.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//
//   next();
// });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;