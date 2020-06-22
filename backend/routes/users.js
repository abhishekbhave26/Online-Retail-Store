const router = require('express').Router();
const sgMail = require('@sendgrid/mail');

let User = require('../models/user.model');

async function sendEmail(email, otp) {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(email, otp);
  const msg = {
    to: email,
    from: 'abhave@buffalo.edu',
    subject: 'Thank you for registering with Execrise Tracker',
    text: 'Thank you for registering with Execrise Tracker',
    html: '<br/><strong> Your OTP for exercise tracker is  ' + otp + '</strong>',
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

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = '';
  const address2 = '';
  const city_state = '';
  const zip = '';
  const age = '';
  const height = '';
  const weight = '';
  const isVerified = false;
  const otp = generateOTP();

  const newUser = new User({
    name, email, password, address, address2,
    city_state, zip, age, height, weight, isVerified, otp
  });
  newUser.save()
    .then(() => {
      sendEmail(email, otp);
      console.log("Email sent");
      res.json('User added!')
    })
    .catch(err => res.status(400).json('Error'));

});

// find a user by id
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


// find a user by email id
router.route('/email/:id').get((req, res) => {
  User.findOne({ email: req.params.id })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});



// delete a user
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update user
router.route('/update/:id').post((req, res) => {
  User.findOne({ email: req.params.id })
    .then(user => {
      user.name = req.body.name;
      user.password = req.body.password;
      user.address = req.body.address;
      user.address2 = req.body.address2;
      user.city_state = req.body.city_state;
      user.zip = req.body.zip;
      user.age = req.body.age;
      user.height = req.body.height;
      user.weight = req.body.weight;

      user.save()
        .then(() => res.json('User updated'))
        .catch(err => res.status(400).json('Error: ' + err));

    })
    .catch(err => res.status(400).json('Error: ' + err));
});


//Update password
router.route('/update/password/:id').post((req, res) => {
  User.findOne({ email: req.params.id })
    .then(user => {
      user.password = req.body.password;

      user.save()
        .then(() => res.json('Password updated'))
        .catch(err => res.status(400).json('Error: ' + err));

    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// OTP verification
router.route('/otp/:id').post((req, res) => {
  User.findOne({ email: req.params.id })
    .then(user => {
      if (parseInt(user.otp) === parseInt(req.body.otp)) {
        user.isVerified = true;
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
  User.findOne({ email: req.params.id })
    .then(user => {
      user.otp = generateOTP();

      user.save()
        .then(() => {
          sendEmail(user.email, user.otp);
          console.log("Email sent");
          res.json('New email otp sent')
        })
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;