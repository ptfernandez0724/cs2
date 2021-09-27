const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const auth = require('../auth');
const { addListener } = require('../models/product');

// create product
router.post('/', auth.verify, (req, res) => {
    const data = {
        course: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

    if(data.isAdmin){
        productController.addProductCategory(data).then(result => res.send(result));
    } else {
        res.send(false)
    }
});

// get all products
router.get('/all', (req, res) => {
    productController.getAllProducts().then(result => res.send(result));
});

// get a specific product
router.get('/:productId', (req, res) => {
    productController.getSpecific(req.params).then(result => res.send(result));
});

// update product
router.put('/:productId', auth.verify, (req, res) => {
    const data = {
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

    if (data.isAdmin) {
        productController.updateProduct(req).then(result => res.send(result));
    } else {
        res.send(false)
    }
});

// archive product
router.put('/:productId/archive', auth.verify, (req, res) => {
    const data = {
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }

    if(data.isAdmin){
        productController.archiveProduct(req).then(result => res.send(result))
    } else {
        res.send(false)
    }
});

module.exports = router;