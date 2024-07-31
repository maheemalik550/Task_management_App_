const mongoose = require('mongoose');

const Notification = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskID: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  message: { type: String, required: true },
  notificationDate: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});


const NotificationSchema = mongoose.model("Notification",Notification)
module.exports = NotificationSchema
