const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    notification_preferences: { type: Boolean, required: true},
    user_email: { type: String, required: true, unique: true, trim: true},
}, {
    timestamps: true,
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
