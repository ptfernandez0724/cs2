const Product = require('../models/product');


// add product
module.exports.addProductCategory = (data) => {

        // let newProduct = new Product({
        //     name: data.product.name,
        //     description: data.product.description,
        //     price: data.product.price
        // });

        // return newProduct.save().then((product, error) => {
        //     if(error){
        //         return false;
        //     } else {
        //         return true;
        //     }
        // })

    return Product.addProductCategory(data, 
        {   name: data.product.name,
            description: data.product.description   
        })
    .save()
    .then(newProduct => { 
        return (newProduct) 
            ? { message: "Product Category is added"} 
            : { message: "Failed" }; })
    .catch(error => res.status(500).send({message: "Internal Server Error"}))
}

// get all products
module.exports.getAllProducts = () => {
    return Product.find({}).then(result =>{
        return result;
    })
}

// get specific product
module.exports.getSpecific = (reqParams) => {
    return Product.findById(reqParams.productId).then(result => {
        return result;
    })
}

// update product
module.exports.updateProduct = (req) => {
    return Product.findByIdAndUpdate({ _id: req.params.productId }, 
        {   name: req.body.name, 
            description: req.body.description, 
            price: req.body.price 
        })
    .then(updatedProduct => { 
        return (updatedProduct) 
            ? { message: "Product update was successful"} 
            : { message: "Product update failed" }; })
    .catch(error => res.status(500).send({message: "Internal Server Error"}))
}

// archive product
module.exports.archiveProduct = (req) => {
    return Product.findByIdAndUpdate({ _id: req.params.productId }, 
        {   isAvailable: false
        })
    .then(archivedProduct => { 
        return (archivedProduct) 
            ? { message: "Product archive was successful"} 
            : { message: "Product archive failed" }; })
    .catch(error => res.status(500).send({message: "Internal Server Error"}))
}