const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    // link to user who booked
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // link to flight booked
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight',
        required: true,
    },
    status: {
        type: String,
        default: 'Confirmed'
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Booking', bookingSchema);