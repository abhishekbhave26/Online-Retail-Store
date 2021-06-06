const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: { type: String, required: true},
    user_email: { type: String, required: true, unique: true},
    user_password: { type: String, required: true, minlength: 8},
    user_contact: {type: Number},
    user_address: { type: String },
    user_address2: { type: String },
    user_city_state: { type: String },
    user_zip_code: { type: Number },
    user_otp: { type: Number },
    is_user_verified: { type: Boolean },
    is_user_admin: {type: Boolean, required: true}
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
