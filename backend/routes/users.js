const router = require('express').Router();
const sgMail = require('@sendgrid/mail');
const jwt = require('jwt-simple');

let User = require('../models/user.model');

async function sendEmail(user_email, user_otp) {
	
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	console.log(user_email, user_otp);
	const msg = {
		to: user_email,
		from: 'abhave@buffalo.edu',
		subject: 'Thank you for registering with Online Retail Store',
		text: 'Thank you for registering with Online Retail Store',
		html: '<br/><strong> Your OTP for online retail store is  ' + user_otp + '</strong>',
	};
	await sgMail.send(msg).then(() => {
		console.log('Message sent')
	}).catch((error) => {
		console.log(error.response.body)
	})
}

function generateOTP() {
	var minm = 100000;
	var maxm = 999999;
	return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

// find all users
router.route('/').get((req, res) => {
	User.find()
	.then(users => res.json(users))
	.catch(err => res.status(400).json('Error: ' + err));
});

// create a new user
router.route('/add').post((req, res) => {
	
	const user_name = req.body.user_name;
	const user_email = req.body.user_email;
	const user_password = req.body.user_password;
	const user_contact = req.body.user_contact;
	const user_address = '';
	const user_address2 = '';
	const user_city_state = '';
	const user_zip = '';
	const user_isVerified = false;
	const user_otp = generateOTP();
	
	const newUser = new User({
		user_name, user_email, user_password, user_address, user_address2,
		user_city_state, user_zip, user_contact, user_isVerified, user_otp
	});
	var expires = new Date();
	expires.setHours(expires.getHours() + 24);
	var token = jwt.encode({ user_email: user_email, exp: expires }, process.env.JWT_SECRET_STRING);
	newUser.save()
	.then(() => {
		sendEmail(user_email, user_otp);
		res.json({
			token: token,
			expires: expires,
			user: newUser.toJSON(),
			header: 'User added!'
		})
	})
	.catch(err => res.status(400).json('Error'));
});

// find a user by id
router.route('/:id').get((req, res) => {
	User.findById(req.params._id)
	.then(user => res.json(user))
	.catch(err => res.status(400).json('Error: ' + err));
});

// find a user by user_email id
router.route('/email/:id').get((req, res) => {
	User.findOne({ user_email: req.params.user_email })
	.then(user => res.json(user))
	.catch(err => res.status(400).json('Error: ' + err));
});

// delete a user
router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params._id)
	.then(() => res.json('User deleted'))
	.catch(err => res.status(400).json('Error: ' + err));
});

// Update user
router.route('/update/:id').post((req, res) => {
	User.findOne({ user_email: req.params._id })
	.then(user => {
		user.user_name = req.body.user_name;
		user.user_password = req.body.user_password;
		user.user_contact = req.body.user_contact;
		user.user_address = req.body.user_address;
		user.user_address2 = req.body.user_address2;
		user.user_city_state = req.body.user_city_state;
		user.user_zip = req.body.user_zip;
		
		user.save()
		.then(() => res.json('User updated'))
		.catch(err => res.status(400).json('Error: ' + err));
		
	})
	.catch(err => res.status(400).json('Error: ' + err));
});

//Update user_password
router.route('/update/password/:id').post((req, res) => {
	User.findOne({ user_email: req.params.user_email })
	.then(user => {
		user.user_password = req.body.user_password;
		
		user.save()
		.then(() => res.json('Password updated'))
		.catch(err => res.status(400).json('Error: ' + err));
		
	})
	.catch(err => res.status(400).json('Error: ' + err));
});

// OTP verification
router.route('/otp/:id').post((req, res) => {
	User.findOne({ user_email: req.params._id })
	.then(user => {
		if (parseInt(user.user_otp) === parseInt(req.body.user_otp)) {
			user.user_isVerified = true;
			user.save()
			.then(() => res.json('User updated'))
			.catch(err => res.status(400).json('Error: ' + err));
		}
		else {
			res.json('Try again')
		}
	})
	.catch(err => res.status(400).json('Error: ' + err));
});

// New OTP Set
router.route('/otp/user/:id').post((req, res) => {
	User.findOne({ user_email: req.params.user_email })
	.then(user => {
		user.user_otp = generateOTP();
		
		user.save()
		.then(() => {
			sendEmail(user.user_email, user.user_otp);
			console.log("Email sent");
			res.json('New email otp sent')
		})
	})
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;