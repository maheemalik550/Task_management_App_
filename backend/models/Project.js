const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Reference to the users collection
  },
  name: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String },
  createdDate: {
    type: Date,
    default: Date.now
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };
