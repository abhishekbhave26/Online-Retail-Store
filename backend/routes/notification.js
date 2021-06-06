const router = require('express').Router();
let Notification = require('../models/notification.model');

// create notofication preference for user
router.route('/add').post((req, res) => {
	const notification_preferences = req.body.notification_preferences;
	const user_email = req.body.user_email;

	const newNotificationPreference = new Notification({
		notification_preferences,
		user_email
	});
	
	newNotificationPreference.save()
	.then(() => res.json('Thank you for your details, our team members will reach out to you.'))
	.catch(err => res.status(400).json('Error: ' + err));
});

// update notification preferences for user
router.route('/update').post((req, res) => {
	Notification.findById(req.params.user_email)
	.then(notification_preference => {
		notification_preference.notification_preferences = req.body.notification_preferences;
		notification_preference.user_email = req.body.user_email;

		notification_preference.save()
		.then(() => res.json('Notification Preference updated'))
		.catch(err => res.status(400).json('Error' + err));
		
	})
	.catch(err => res.status(400).json('Error' + err));
});

module.exports = router;
