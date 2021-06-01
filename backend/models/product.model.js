const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_description: { type: String },
    product_price: { type: mongoose.Types.Currency, required: true },
    category_id: { type: Number, required: true },
    product_weight: { type: Number },
    product_inStock: { type: Boolean, required: true },
    product_shipping_available: { type: Boolean, required: true },
    product_image: {type: String, required: true }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
