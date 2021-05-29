const router = require('express').Router();
let Help = require('../models/help.model');

// get all help requests
router.route('/').get((req, res) => {
	Help.find()
	.then(help_reqs => res.json(help_reqs))
	.catch(err => res.status(400).json('Error: ' + err));
});

// creates a new help request
router.route('/add').post((req, res) => {
	const help_id = req.body.help_id;
	const user_name = req.body.user_name;
	const user_email = req.body.user_email;
	const help_description = req.body.help_description;
	const help_status = req.body.help_status;
	
	const newHelp = new Help({
		help_id,
		user_name,
		user_email,
		help_description,
		help_status
	});
	
	newHelp.save()
	.then(() => res.json('Thank you for your details, our team members will reach out to you.'))
	.catch(err => res.status(400).json('Error: ' + err));
});

// find a help request by id
router.route('/:id').get((req, res) => {
	Help.findById(req.params.help_id)
	.then(help => res.json(help))
	.catch(err => res.status(400).json('Error' + err));
});

// delete help request
router.route('/:id').delete((req, res) => {
	Help.findByIdAndDelete(req.params.help_id)
	.then(() => res.json('Help request deleted'))
	.catch(err => res.status(400).json('Error' + err));
});

// update a help request
router.route('/update/:id').post((req, res) => {
	Help.findById(req.params.help_id)
	.then(help_request => {
		help_request.help_id = req.body.help_id;
		help_request.user_name = req.body.user_name;
		help_request.user_email = req.body.user_email;
		help_request.help_description = req.body.help_description;
		help_request.help_status = req.body.help_status;

		help_request.save()
		.then(() => res.json('Help Request updated'))
		.catch(err => res.status(400).json('Error' + err));
		
	})
	.catch(err => res.status(400).json('Error' + err));
});

// returns list of help requests for a given user
router.route('/user/:id').get((req, res) => {
	Help.find({ help_id: req.params.help_id })
		.then(help_reqs => res.json(help_reqs))
		.catch(err => res.status(400).json('Error' + err));
	}
);

module.exports = router;
