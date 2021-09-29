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
    return await User.updateOne(
        {
            _id: data.userId
        },
        { 
            $push: 
            { 
                cartItems: 
                { 
                    _id: data.productId
                }
            }
        }
        
    )
    .then(async result => 
        {
            if (result.modifiedCount>0) {
                
                return await Product.updateOne(
                    { 
                        _id: data.productId 
                    }, 
                    {   status: 'AddedToCart'
                    }
                )
                .then(result => 
                    { 
                        return (result) 
                            ? "Product added to cart successfully" 
                            : "Product added to cart failed" 
                    }
                )
                .catch(error => 
                    {
                        return "Internal Server Error"
                    }
                )
            } else {
                console.log(result)
                return "Product add to cart was unsucessful"
            }

        } 
    )
} 


// user checkout
module.exports.checkout = async (data) => {
    return await User.updateOne(
        
        {
            _id: data.userId
        },
        { 
            $push: 
            { 
                purchaseHistory: 
                { 
                    _id: data.productId
                }
            },
            $set: 
            {
                cartItems:[]
            }            
        }

    )
    .then(async result => 
        {
            if (result.modifiedCount>0) {
                
                return await Product.updateOne(
                    { 
                        _id: data.productId 
                    }, 
                    {   status: 'Unavailable'
                    }
                )
                .then(result => 
                    { 
                        return (result) 
                            ? "Order Successful" 
                            : "Order failed" 
                    }
                )
                .catch(error => 
                    {
                        return "Internal Server Error"
                    }
                )
            } else {
                console.log(result)
                return "Order was unsucessful"
            }

        } 
    )

}

// get user's orders
module.exports.getOrders = (data) => {
    return User.findById({_id: data.userId})
    
    .then(
        user =>{

            return user.purchaseHistory;

        })
}

// get all orders(admin only)
module.exports.getAllOrders = () => {
    return User.find({})
    
    .then(
        user => {
            let orders = []
            for(let i=0; i<user.length; i++) {
                if (user[i].purchaseHistory.length>0) {
                    let orderDetails = {
                        buyerId: user[i]._id,
                        purchases: user[i].purchaseHistory
                    }
                    orders.push(orderDetails)
                } 
            }
            return (orders.length>0) ? orders : "No user order"
        })
}

