const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const Product = require('../models/product');

/*
    Checkout algorithm (from cart to purchase/checkout)
     1) Find user's cartitems
     2) Update user's purchaseHistory to add user's cart items
     3) Empty user's cart items
*/
/*
    Retrieve all orders algorithm 
     1) Get all user
     2) Loop all fetched users, access their purchaseHistory then put in an array
     3) return array
*/


// user registration
module.exports.registerUser = (reqBody) => {
    let newUser = new User({
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        email: reqBody.email,
        mobileNo: reqBody.mobileNo,

        password: bcrypt.hashSync(reqBody.password, 10)
    })


    return newUser.save().then((user, error) => {
        if (error){
            return false;          
        } else {
            return true;
        }
    })
}

// login user
module.exports.loginUser = (reqBody) => {
    return User.findOne({email: reqBody.email}).then(result => {
        if(result == null){
            return false
        } else {


            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)

            if(isPasswordCorrect){

                return {accessToken: auth.createAccessToken(result.toObject())}
            } else {

                return false;
            }
        }
    })
}


// add to cart
module.exports.addToCart = async (data) => {

    /*
        1. Get price from Product table
        2. Check if product exists in User's cartItems
            if not exists, push product, quantity to User's cartItems
            if exists do the following:
                1) get current quantity of product
                2) add current quantity of product to received quantity of product
                3) update product's entry in User's cartItems using quantity in step 2.

    */

    // Get price from Product table
    let productPrice = await Product.findById(data.productId)
                        .then(product => {return product.price})
    
    //Check if product exists in User's cartItems
    return await User.find(
        {
            _id: data.userId, 
            'cartItems.productId': {$eq: data.productId}
        }
    )
    .then(
        userDetails => {

            console.log("User details: " + userDetails)

            if (userDetails) { //product EXISTS in User's cartItems

                //todo: get current quantity of product


            } else { 
                //product does not exists in User's cartItems
                return User.updateOne(
                    {
                        _id: data.userId
                    },
                    { 
                        $push: 
                        { 
                            cartItems: 
                            { 
                                productId: data.productId,
                                quantity: data.quantity
                            }
                        }
                    }
                )
                .then( result => 
                    {
                        if (result.nModified > 0) {
                            return { message: "Product add to cart successfully for the first time"}
                        } else {
                            return {message: "Product add to cart was unsucessful"}
                        }
                    } 
                )
            }
        }
    )




    let isUserUpdated = await User.findById(data.userId).then(user => {
        user.cartItems.push({
            productId: data.productId,
            quantity: data.quantity
        });

    return user.save().then((user, error) => {
        if(error){
            return false;
        } else {
            return true;
        }
    })
})

    let isProductUpdated = await Product.findById(data.productId).then(product => {
        let totalPrice = product.price*data.quantity

        product.userAddToCart.push({
            userId: data.userId,
            quantity: data.quantity,
            totalAmount: totalPrice
        });

        return product.save().then((product, error) => {
            if(error) {
                return false;
            } else {
                return true;
            }
        })
    })
    if(isUserUpdated && isProductUpdated){
        return true;
    } else {
        return false;
    }
}

// user checkout
module.exports.checkout = async (data) => {

    /*
        
        1. Check if product exists in User's cartItems
            if not exists, push product, quantity to User's cartItems
            if exists do the following:
                1) get current quantity of product
                2) add current quantity of product to received quantity of product
                3) update product's entry in User's cartItems using quantity in step 2.

    */

    
    //Check if product exists in User's cartItems
    return await User.find(
        {
            _id: data.userId, 
            'cartItems.productId': {$eq: data.productId}
        }
    )
    .then(
        userDetails => {

            console.log("User details: " + userDetails)

            if (userDetails) { //product EXISTS in User's cartItems

                //todo: get current quantity of product


            } else { 
                //product does not exists in User's cartItems
                return User.updateOne(
                    {
                        _id: data.userId
                    },
                    { 
                        $push: 
                        { 
                            cartItems: 
                            { 
                                productId: data.productId,
                                quantity: data.quantity
                            }
                        }
                    }
                )
                .then( result => 
                    {
                        if (result.nModified > 0) {
                            return { message: "Product add to cart successfully for the first time"}
                        } else {
                            return {message: "Product add to cart was unsucessful"}
                        }
                    } 
                )
            }
        }
    )
}

// sell product
// module.exports.addProduct = async (data) => {
//     let isUserUpdated = await User.findById(data.userId).then(user => {
//         user.sellItems.push({productId: data.productId})

//     return user.save().then((user, error) => {
//         if(error){
//             return false;
//         } else {
//             return true;
//         }
//     })
// })

//     let isProductUpdated = await Product.findById(data.productId).then(product => {
//         product.buyers.push({userId: data.userId});

//         return product.save().then((product, error) => {
//             if(error) {
//                 return false;
//             } else {
//                 return true;
//             }
//         })
//     })
//     if(isUserUpdated && isProductUpdated){
//         return true;
//     } else {
//         return false;
//     }
// }


