const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Invalid']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },   
    createdOn: {
        type: Date,
        default: new Date()
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    userAddToCart: [
        {
            userId: {
                type: String,
                required: [true, 'Userid is required']
            },
            dateOrdered: {
                type: Date,
                required: new Date()
            }          
        }
    ],
    userPurchased: [
        {
            userId: {
                type: String,
                required: [true, 'Userid is required']
            },
            dateOfPurchase: {
                type: Date,
                default: new Date()
            }
        }
    ]
});

module.exports = mongoose.model("product", productSchema);