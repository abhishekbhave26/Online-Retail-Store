const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// returns all exercise logs
router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// create a exercise log
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// find a exercise log by id
router.route('/:id').get((req,res) => {
    Exercise.findById(req.params.id)
    .then(exercise =>res.json(exercise))
    .catch(err => res.status(400).json('Error'+err));
});


// delete exercise log
router.route('/:id').delete((req,res) => {
  Exercise.findByIdAndDelete(req.params.id)
  .then(() =>res.json('Exercise deleted'))
  .catch(err => res.status(400).json('Error'+err));
});

// update exercise log
router.route('/update/:id').post((req,res) => {
  Exercise.findById(req.params.id)
  .then(exercise => {
    exercise.username=req.body.username;
    exercise.description=req.body.description;
    exercise.duration=Number(req.body.duration);
    exercise.date=Date.parse(req.body.date);
    
    exercise.save()
    .then(() =>res.json('Exercise updated'))
    .catch(err => res.status(400).json('Error'+err));
    
  })
  .catch(err => res.status(400).json('Error'+err));
});

// returns list of exercises with given username
router.route('/username/:id').get((req, res) => {
  if(req.params.id=='-- ALL USERS --')
  {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
  }
  else
  {
    Exercise.find({username: req.params.id})
    .then(exercises =>res.json(exercises))
    .catch(err => res.status(400).json('Error'+err));
  }
});

module.exports = router;