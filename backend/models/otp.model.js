const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    user_id: { type: Number, required: true},
    user_email: { type: String, required: true, unique: true, trim: true},
    user_otp: { type: Number }
}, {
    timestamps: true,
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;
