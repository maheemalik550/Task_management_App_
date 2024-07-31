const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  taskID: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  commentText: { type: String, required: true },
  commentDate: { type: Date, default: Date.now },
});

const CommentSchema = mongoose.model("Comment",Comment);


module.exports = CommentSchema
