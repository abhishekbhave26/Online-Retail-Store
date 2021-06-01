const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const orderSchema = new Schema({
    user_email: { type: String, required: true},
    order_details: {type: Array, required: true},
    order_total: { type: mongoose.Types.Currency, required: true },
    order_status: { type: String, required: true},
    order_placed_date: { type: Date, required: true},
    order_delivery_date: { type: Date},
    payment_status: {type: String, required: true},
    card_holder_name: { type: String, required: true},
    card_number: { type: String, required: true},
    card_expiry_date: { type: String, required: true},
    card_CVV: { type: Number, required: true},
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
