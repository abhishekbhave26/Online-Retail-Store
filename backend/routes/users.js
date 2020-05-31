const router = require('express').Router();
const bcrypt = require('bcrypt');
let User = require('../models/user.model');

// find all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// create a new user
router.route('/add').post(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = await bcrypt.hash(req.body.password,10);

  const newUser = new User({name, email, password});
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// find a user by id
router.route('/:id').get((req,res) => {
  User.findById(req.params.id)
  .then(user =>res.json(user))
  .catch(err => res.status(400).json('Error: '+err));
});

// delete a user
router.route('/:id').delete((req,res) => {
User.findByIdAndDelete(req.params.id)
.then(() => res.json('User deleted'))
.catch(err => res.status(400).json('Error: '+err));
});

// Update user
router.route('/update/:id').post((req,res) => {
User.findById(req.params.id)
.then(async user => {
  user.name=req.body.name;
  user.password= await bcrypt.hash(req.body.password,10);
  
  user.save()
  .then(() =>res.json('User updated'))
  .catch(err => res.status(400).json('Error: '+err));
  
})
.catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;