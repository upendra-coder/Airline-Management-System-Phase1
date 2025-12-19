const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email']
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }, 
    isAdmin: {
        type: Boolean,
        default: false  // By default, a new person is NOT an admin
    }
}, {
    timestamps: true  // Automatically adds 'createdAt' and 'updatedAt'
})

module.exports = mongoose.model('User', userSchema);