const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
});

const TeamSchema = mongoose.model('Team', teamSchema);

module.exports = { TeamSchema };
