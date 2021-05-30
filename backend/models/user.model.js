const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: { type: String, required: true},
    user_email: { type: String, required: true, unique: true, trim: true},
    user_password: { type: String, required: true, minlength: 8},
    user_contact: {type: Number},
    user_address: { type: String },
    user_address2: { type: String },
    user_city_state: { type: String },
    user_zip: { type: Number },
    user_isVerified: { type: Boolean },
    user_otp: { type: Number }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
