const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const auth = require('../auth');
const { addListener } = require('../models/category');

//todo: create category for admin only

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

module.exports = router;