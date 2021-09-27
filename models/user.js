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
            },
            postedOn: {
                type: Date,
                default: new Date()
            },
            status: {
                type: String,
                default: "Available"
            }
        }
    ],

    cartItems: [
        {
            productId: {
                type: String,
                required: [true, 'Product ID is required']
            },
            orderedOn: {
                type: Date,
                default: new Date()
            },
            status: {
                type: String,
                default: "Pending"
            }
        }
    ],
    purchaseHistory: [
        {
            productId: {
                type: String,
                required: [true, 'Product ID is required']
            },
            purchaseDate: {
                type: Date,
                default: new Date()
            }
        }
    ]
});

module.exports = mongoose.model("user", userSchema);