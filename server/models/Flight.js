const mongoose = require('mongoose');

const flightSchema = mongoose.Schema({
    airline: {
        type: String,
        required: true, 
    },
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    departureTime: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true,
        default: 60 // Default plane capacity
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);