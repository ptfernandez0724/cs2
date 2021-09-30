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
    category: {
        type: String,
        required: [true, 'Category is required']
    },   
    // imageId: {
    //     type: Image
    // },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    // isAvailable: {
    //     type: Boolean,
    //     default: true
    // },
    status: {
        type: String,
        default: 'Available'
    },
    userPurchased: [
        {
            userId: {
                type: String,
                required: [true, 'Userid is required']
            },
            quantity: {
                type: Number,
                required: [true, 'Quantity is required']
            },
            totalAmount:{
                type: Number,
                required: [true, 'Amount is required']
            },
            dateOfPurchase: {
                type: Date,
                default: new Date()
            }
        }
    ]
});

module.exports = mongoose.model("product", productSchema);