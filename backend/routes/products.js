const router = require('express').Router();
let Product = require('../models/product.model');

// returns all products
router.route('/').get((req, res) => {
	Product.find()
	.then(products => res.json(products))
	.catch(err => res.status(400).json('Error: ' + err));
});

// creates a product
router.route('/add').post((req, res) => {
	const product_name = req.body.product_name;
	const product_description = req.body.product_description;
	const category_id = req.body.category_id;
	const product_price = Number(req.body.product_price);
	const product_weight = Number(req.body.product_weight);
	const product_id = Number(req.body.product_id);
	const product_inStock = req.body.product_inStock;
	const product_shipping_available = req.body.product_shipping_available;
	const product_image = req.body.product_image;
	
	const newProduct = new Product({
		product_name,
		product_description,
		category_id,
		product_price,
		product_inStock,
		product_shipping_available,
		product_image,
		product_weight,
		product_id
	});
	
	newProduct.save()
	.then(() => res.json('Product added!'))
	.catch(err => res.status(400).json('Error: ' + err));
});

// find a product by id
router.route('/:id').get((req, res) => {
	Product.findById(req.params.id)
	.then(product => res.json(product))
	.catch(err => res.status(400).json('Error' + err));
});

// delete product
router.route('/:id').delete((req, res) => {
	Product.findByIdAndDelete(req.params.id)
	.then(() => res.json('Product deleted'))
	.catch(err => res.status(400).json('Error' + err));
});

// update a product
router.route('/update/:id').post((req, res) => {
	Product.findById(req.params.id)
	.then(product => {
		product.product_name = req.body.product_name;
		product.product_description = req.body.product_description;
		product.category_id = req.body.category_id;
		product.product_price = Number(req.body.product_price);
		product.product_weight = Number(req.body.product_weight);
		product.product_id = Number(req.body.product_id);
		product.product_inStock = req.body.product_inStock;
		product.product_shipping_available = req.body.product_shipping_available;
		product.product_image = req.body.product_image;
	
		product.save()
		.then(() => res.json('Product updated'))
		.catch(err => res.status(400).json('Error' + err));
		
	})
	.catch(err => res.status(400).json('Error' + err));
});

/*
// returns list of products with given user
router.route('/user/:id').get((req, res) => {
	if (req.params.id === '-- ALL USERS --') {
		Product.find()
		.then(products => res.json(products))
		.catch(err => res.status(400).json('Error: ' + err));
	}
	else {
		Product.find({ product_id: req.params.id })
		.then(products => res.json(products))
		.catch(err => res.status(400).json('Error' + err));
	}
});
*/

//returns a list of products of a particular category

module.exports = router;