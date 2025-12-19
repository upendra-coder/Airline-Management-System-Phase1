const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

const bookFlight = async (req, res) => {
    try {
        const { userId, flightId } = req.body;

        // Find the flight
        const flight = await Flight.findById(flightId);

        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }

        // Check if seats are available
        if (flight.availableSeats <= 0) {
            return res.status(400).json({ message: 'Flight is fully booked' });
        }

        // Create the Booking
        const booking = await Booking.create({
            user: userId,
            flight: flightId
        });

        // Decrease available seats by 1
        flight.availableSeats = flight.availableSeats - 1;
        await flight.save();

        res.status(201).json({ message: 'Booking Confirmed!', booking });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
const cancelBooking = async (req, res) => {
    try {
        // 1. Find the booking
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // 2. Find the associated Flight
        const flight = await Flight.findById(booking.flight);

        // 3. Increase available seats
        if (flight) {
            const oldSeats = flight.availableSeats;
            flight.availableSeats = flight.availableSeats + 1;
            
            await flight.save(); // <--- This saves the change to DB
        }

        // 4. Delete the booking
        await booking.deleteOne();
        res.status(200).json({ message: 'Booking cancelled' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getMyBookings = async (req,res) => {
    try{
        const bookings = await Booking.find({ user: req.user.id }).populate('flight');

        res.status(200).json(bookings);
    } catch(error){
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = { bookFlight, cancelBooking, getMyBookings };