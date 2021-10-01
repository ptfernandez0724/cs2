const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const auth = require('../auth');
const { addListener } = require('../models/product');


// post product

router.post('/', auth.verify, (req, res) => {
    const userId = auth.decode(req.headers.authorization).id
    productController.addProduct(req, userId).then(result => res.status(201).send(result));
});

// get all available products
router.get('/all', (req, res) => {
    productController.getAllProducts().then(result => res.status(200).send(result));
});

// get a specific product
router.get('/:productId', (req, res) => {
    productController.getSpecific(req.params).then(result => res.status(200).send(result));
});

// update product
router.put('/:productId', auth.verify, (req, res) => {
    const userId = auth.decode(req.headers.authorization).id    
    productController.updateProduct(req,userId).then(result => res.status(201).send(result));
    
});

// archive product
router.put('/:productId/archive', auth.verify, (req, res) => {
    const userId = auth.decode(req.headers.authorization).id
    productController.archiveProduct(req,userId).then(result => res.send(result))
    
});

module.exports = router;