const sgMail = require('@sendgrid/mail');

/* Try to create a common email class with to,from,subject,text,html and sendEmail() as members and created object and call in every place */

async function sendUserRegistrationOTPEmail(user_email, user_otp) {
	/*
	set some data
	sendEmail(user_email, data)
	*/
}

async function sendOrderReceivedEmail(user_email, user_otp) {
	/*
	set some data
	sendEmail(user_email, data)
	*/
}

async function sendOrderUpdatedEmail(user_email, user_otp) {
	/*
	set some data
	sendEmail(user_email, data)
	*/
}

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

module.exports = {
	sendUserRegistrationOTPEmail : sendUserRegistrationOTPEmail,
	sendOrderReceivedEmail : sendOrderReceivedEmail,
	sendOrderUpdatedEmail : sendOrderUpdatedEmail,
	sendEmail : sendEmail
};
