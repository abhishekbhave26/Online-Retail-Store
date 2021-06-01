const router = require('express').Router();
let Category = require('../models/category.model');

// create a new category
router.route('/add').post((req, res) => {
	const category_name = req.body.category_name;
	const category_description = req.body.category_description;
	const category_image = req.body.category_image;
	
	const newCategory = new Category({
		category_name,
		category_description,
		category_image,
	});
	
	newCategory.save()
	.then(() => res.json('New category added successful.'))
	.catch(err => res.status(400).json('Error: ' + err));
});

// get all categories
router.route('/').get((req, res) => {
	Category.find()
	.then(categories => res.json(categories))
	.catch(err => res.status(400).json('Error: ' + err));
});

// find a category by id
router.route('/:id').get((req, res) => {
	Category.findById(req.params._id)
	.then(category => res.json(category))
	.catch(err => res.status(400).json('Error' + err));
});

// delete category
router.route('/:id').delete((req, res) => {
	Category.findByIdAndDelete(req.params._id)
	.then(() => res.json('Category deleted successful.'))
	.catch(err => res.status(400).json('Error' + err));
});

// update a category
router.route('/update/:id').post((req, res) => {
	Category.findById(req.params._id)
	.then(category => {
		category.category_name = req.body.category_name;
		category.category_description = req.body.category_description;
        category.category_email = req.body.category_email;
		
		category.save()
		.then(() => res.json('Category updated successful.'))
		.catch(err => res.status(400).json('Error' + err));
	})
	.catch(err => res.status(400).json('Error' + err));
});

module.exports = router;
