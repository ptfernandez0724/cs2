const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const auth = require('../auth');

// register user
router.post('/register', (req, res) => {
    userController.registerUser(req.body).then(result => res.status(201).send(result));
});

// user login
router.post('/login', (req, res) => {
    userController.loginUser(req.body).then(result => res.send(result));
});


// add to cart
router.post('/addtocart', auth.verify, (req, res) => {
    let data = {
        userId: auth.decode(req.headers.authorization).id,
        productId: req.body.productId
    }
    userController.addToCart(data).then(result => res.send(result))
})

// user checkout
router.post('/checkout', auth.verify, (req, res) => {
    let data = {
        userId: auth.decode(req.headers.authorization).id,
        productId: req.body.productId
    }
    userController.checkout(data).then(result => res.send(result))
})


module.exports = router;