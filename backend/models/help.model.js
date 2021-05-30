const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const helpSchema = new Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    help_description: { type: String, required: false },
    help_status: {type: String, required: true}
}, {
    timestamps: true,
});

const Help = mongoose.model('Help', helpSchema);

module.exports = Help;
