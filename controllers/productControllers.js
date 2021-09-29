const Product = require('../models/product');
const User = require('../models/user');


// add product as seller
module.exports.addProduct = async (req, userId) => {

    let newProduct = await new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price
    })

    return await newProduct.save().then((product, error) => 
        {
            console.log("new product: " + product)

            if (error) {
                return false
            } else {
                return User.updateOne( 
                    {
                        _id: userId
                    },
                    {
                        $push: { 
                            sellItems: { 
                                productId: product._id
                            }
                        }
                    }
                )
                .then(result => { (result.modifiedCount>=1) 
                    return (result)
                    ? "Product added successfully"
                    : "Product added failed"
                })
            }
        }
    )
}

// get all products
module.exports.getAllProducts = () => {
    return Product.find({}).then(result =>{
        return result;
    })
}

// get specific product
module.exports.getSpecific = (req) => {
    return Product.findById(req.productId).then(result => {
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
            ? "Product update was successful"
            : "Product update failed" 
        })
    .catch(error => res.status(500).send({message: "Internal Server Error"}))
}

// archive product
module.exports.archiveProduct = (req) => {
    return Product.findByIdAndUpdate({ _id: req.params.productId }, 
        {   status: 'Unavailable'
        })
    .then(archivedProduct => { 
        return (archivedProduct) 
            ? "Product archive was successful" 
            : "Product archive failed" 
        })
    .catch(error => res.status(500).send({message: "Internal Server Error"}))
}

