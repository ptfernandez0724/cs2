const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const auth = require('../auth');

// register user
router.post('/register', (req, res) => {
    userController.registerUser(req.body).then(result => res.send(result));
});

// user login
router.post('/login', (req, res) => {
    userController.loginUser(req.body).then(result => res.send(result));
});


// buy product
router.post('/buy', auth.verify, (req, res) => {
    let data = {
        userId: auth.decode(req.headers.authorization).id,
        productId: req.body.productId
    }
    userController.addToCart(data).then(result => res.send(result))
})

// sell product
router.post('/sell', auth.verify, (req, res) => {
    let data = {
        userId: auth.decode(req.headers.authorization).id,
        productId: req.body.productId
    }
    userController.addProduct(data).then(result => res.send(result))
})



module.exports = router;