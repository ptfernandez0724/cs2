const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    email : {
        type: String,
        required: [true, 'E-mail is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    mobileNo: {
        type: String,
        required: [true, "Mobile Number is required"]
    },

    sellItems: [
        {
            productId: {
                type: String,
                required: [true, 'Product ID is required'],   
            }
        }
    ],

    cartItems: [
        {
            productId: {
                type: String,
                required: [true, 'Product ID is required']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required']
            },
            orderedOn: {
                type: Date,
                default: new Date()
            }
        }
    ],
    purchaseHistory: [
        {
            productId: {
                type: String,
                required: [true, 'Product ID is required']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required']
            },
            purchaseDate: {
                type: Date,
                default: new Date()
            }
        }
    ]
});

module.exports = mongoose.model("user", userSchema);