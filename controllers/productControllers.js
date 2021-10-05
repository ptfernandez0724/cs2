const Product = require('../models/product');
const User = require('../models/user');


// add product as seller
module.exports.addProduct = async (req, userId) => {

    let newProduct = await new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        createdBy: userId
    })

    return await newProduct.save().then((product, error) => 
        {
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
                .then(result => { 
                    return (result)
                                    ? "Product added successfully"
                                    : "Product added failed"
                })
            }
        }
    )
}

// get all available products
module.exports.getAllProducts = () => {
    return Product.find({status: 'Available'}).then(result =>{
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
module.exports.updateProduct = async (req, userId) => {

        return await Product.findOneAndUpdate({ _id: req.params.productId, createdBy: userId }, 
            {   name: req.body.name, 
                description: req.body.description, 
                category: req.body.category,
                price: req.body.price,
                status:  req.body.status
            })
        .then(async updatedProduct => {          
            return await (updatedProduct)
                ? "Product update successfully"
                : "Product update was unsuccessful"
            
            })
        .catch(error => res.status(500).send({message: "Internal Server Error"}))
    
}

// archive product
module.exports.archiveProduct = (req, userId) => {
    return Product.findOneAndUpdate({ _id: req.params.productId, createdBy: userId }, 
        {   status: 'Unavailable'
        })
    .then(archivedProduct => { 
        return (archivedProduct) 
            ? "Product archive was successful" 
            : "Product archive failed" 
        })
    .catch(error => res.status(500).send({message: "Internal Server Error"}))
}

