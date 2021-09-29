const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryControllers');
const auth = require('../auth');
const { addListener } = require('../models/category');

// create new category
router.post('/', auth.verify, (req, res) => {
    const data = {
        category: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }
    if(data.isAdmin){
    categoryController.addCategory(req).then(result => res.status(201).send(result));
    } else {
        res.send(false)
    }
});
// update category
router.put('/:categoryId', auth.verify, (req, res) => {
    const data = {
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }
    if(data.isAdmin){
    categoryController.updateCategory(req).then(result => res.status(201).send(result));
    } else {
        res.send(false)
    }
});
// archive category
router.put('/:categoryId/archive', auth.verify, (req, res) => {
    const data = {
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }
    if(data.isAdmin){
    categoryController.archiveCategory(req).then(result => res.send(result))
    } else {
        res.send(false)
    }
});

module.exports = router;