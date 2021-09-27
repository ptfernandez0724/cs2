const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth');
const Course = require('../models/product');



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
    let isUserUpdated = await User.findById(data.userId).then(user => {
        user.cartItems.push({productId: data.productId})

    return user.save().then((user, error) => {
        if(error){
            return false;
        } else {
            return true;
        }
    })
})

    let isProductUpdated = await Product.findById(data.productId).then(product => {
        product.buyers.push({userId: data.userId});

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

// sell product
module.exports.addProduct = async (data) => {
    let isUserUpdated = await User.findById(data.userId).then(user => {
        user.sellItems.push({productId: data.productId})

    return user.save().then((user, error) => {
        if(error){
            return false;
        } else {
            return true;
        }
    })
})

    let isProductUpdated = await Product.findById(data.productId).then(product => {
        product.buyers.push({userId: data.userId});

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


