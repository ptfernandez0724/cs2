const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Invalid']
    }, 
    createdOn: {
        type: Date,
        default: new Date()
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("category", categorySchema);