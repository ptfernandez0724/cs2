const Product = require('../models/product');
const User = require('../models/user');

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
        ? "Product Category is added" 
        : "Failed" 
    })
.catch(error => res.status(500).send({message: "Internal Server Error"}))
}