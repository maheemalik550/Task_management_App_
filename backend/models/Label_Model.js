const mongoose = require('mongoose');

const Label = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, default: '#ffffff' },
});


const LabelSchema = mongoose.model("Label",Label)

module.exports = LabelSchema
