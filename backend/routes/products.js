const router = require('express').Router();
let Product = require('../models/product.model');

// returns all products
router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

// creates a products
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const category = req.body.category;
  const price = Number(req.body.price);
  const weight = Number(req.body.weight);
  const productID = Number(req.body.productID);
  const inStock = req.body.inStock;

  const newProduct = new Product({
    name,
    description,
    category,
    price,
    inStock,
    weight,
    productID
  });

  newProduct.save()
  .then(() => res.json('Product added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// find a product by id
router.route('/:id').get((req,res) => {
    Product.findById(req.params.id)
    .then(product =>res.json(product))
    .catch(err => res.status(400).json('Error'+err));
});


// delete product
router.route('/:id').delete((req,res) => {
  Product.findByIdAndDelete(req.params.id)
  .then(() =>res.json('Product deleted'))
  .catch(err => res.status(400).json('Error'+err));
});

// update a product
router.route('/update/:id').post((req,res) => {
  Product.findById(req.params.id)
  .then(product => {
    product.name = req.body.name;
    product.description = req.body.description;
    product.category = req.body.category;
    product.price = Number(req.body.price);
    product.weight = Number(req.body.weight);
    product.productID = Number(req.body.productID);
    product.inStock = req.body.inStock;

    product.save()
    .then(() =>res.json('Product updated'))
    .catch(err => res.status(400).json('Error'+err));
    
  })
  .catch(err => res.status(400).json('Error'+err));
});

// returns list of products with given user
router.route('/user/:id').get((req, res) => {
  if(req.params.id=='-- ALL USERS --')
  {
    Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
  }
  else
  {
    Product.find({productID: req.params.id})
    .then(products =>res.json(products))
    .catch(err => res.status(400).json('Error'+err));
  }
});

module.exports = router;