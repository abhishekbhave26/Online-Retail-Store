const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: { type: Number, required: true},
    user_email: { type: String, required: true, unique: true, trim: true},
    order_total: { type: Number, required: true },
    order_status: { type: String, required: true},
    order_placed_date: { type: Date, required: true},
    order_delivery_date: { type: Date},
    order_payment_info: {type: String, required: true}
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
