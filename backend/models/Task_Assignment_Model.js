const mongoose = require('mongoose');

const Task_Assignment = new mongoose.Schema({
  taskID: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  assignedDate: { type: Date, default: Date.now },
  completedDate: { type: Date },
});

const Task_Assignment_Schema = mongoose.model("Task_Assignment",Task_Assignment);


module.exports = Task_Assignment_Schema
