const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    catgeory_id: {type: Number, required: true},
    category_name: { type: String, required: true, unique: true },
    catgeory_description: { type: String, required: false },
    category_image: {type: String, required: true }
}, {
    timestamps: true,

});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
