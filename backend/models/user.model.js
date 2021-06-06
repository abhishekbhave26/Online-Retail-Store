const mongoose = require('mongoose');
var crypto = require('crypto');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: { type: String, required: true},
    user_email: { type: String, required: true, unique: true},
    user_hash: { type: String, required: true},
    user_salt: { type: String, required: true},
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

// Method to set salt and hash the password for a user 
userSchema.methods.setPassword = function(password) { 
    // Creating a unique salt for a particular user 
    this.user_salt = crypto.randomBytes(16).toString('hex'); 
    // Hashing user's salt and password with 1000 iterations
    this.user_hash = crypto.pbkdf2Sync(password, this.user_salt,  
    1000, 64, `sha512`).toString(`hex`); 
}; 
     
// Method to check the entered password is correct or not 
userSchema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.user_salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.user_hash === hash; 
};

const User = mongoose.model('User', userSchema);

module.exports = User;
