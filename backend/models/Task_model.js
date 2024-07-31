const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  progress: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  creatorUserID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teamID: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  assignedToTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Task', TaskSchema);


