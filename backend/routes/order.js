const router = require('express').Router();
let Order = require('../models/order.model');
let enum_service = require('../services/enum_service');
let sendEmail = require('../services/email_service');

// create a new order
router.route('/add').post((req, res) => {
	const user_email = req.body.user_email;
    const order_details = req.body.order_details;
    const order_total = req.body.order_total;
    const order_status = enum_service.order_status_type.SUBMITTED;
    const order_placed_date = req.body.order_placed_date;
    const order_delivery_date = req.body.order_delivery_date;
    const payment_status = enum_service.payment_status_type.PENDING;
    const card_holder_name = req.body.card_holder_name;
    const card_number = req.body.card_number;
    const card_expiry_date = req.body.card_expiry_date;
    const card_CVV = req.body.card_CVV;

	const newOrder = new Order({
		user_email,
        order_details,
        order_total,
        order_status,
        order_placed_date,
        order_delivery_date,
        payment_status,
        card_holder_name,
        card_number,
        card_expiry_date,
        card_CVV
	});
	
	newOrder.save()
	.then(() => {
		//sendEmail(user_email, user_otp);
		res.json('Order placed successfully.')
	})
	.catch(err => res.status(400).json('Error: ' + err));
});

// get all orders
router.route('/').get((req, res) => {
	Order.find()
	.then(order => res.json(order))
	.catch(err => res.status(400).json('Error: ' + err));
});

// find an order by id
router.route('/:id').get((req, res) => {
	Order.findById(req.params._id)
	.then(order => res.json(order))
	.catch(err => res.status(400).json('Error' + err));
});

// get list of orders for a given user
router.route('/user/:id').get((req, res) => {
	Order.find({ user_email: req.params.user_email })
	.then(order => res.json(order))
	.catch(err => res.status(400).json('Error' + err));
	}
);

// update order details
router.route('/update/:id').post((req, res) => {
	Order.findById(req.params._id)
	.then(order => {
        order.order_details = req.body.order_details
        order.order_total = req.body.order_total
        order.order_status = req.body.order_status
        order.order_delivery_date = req.body.order_delivery_date
        order.payment_status = req.body.payment_status

		order.save()
		.then(() => {
            //sendEmail(user_email, user_otp);
		    res.json('Order updated successfully.')
        })
		.catch(err => res.status(400).json('Error' + err));
		
	})
	.catch(err => res.status(400).json('Error' + err));
});

// update order payment details
router.route('/update/:id/payment').post((req, res) => {
	Order.findById(req.params._id)
	.then(order => {
        order.card_holder_name = req.body.card_holder_name;
        order.card_number = req.body.card_number;
        order.card_expiry_date = req.body.card_expiry_date;
        order.card_CVV = req.body.card_CVV;

		order.save()
		.then(() => res.json('Order payment updated successfully.'))
		.catch(err => res.status(400).json('Error' + err));
		
	})
	.catch(err => res.status(400).json('Error' + err));
});

module.exports = router;
