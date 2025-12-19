const Flight = require('../models/Flight');

const addFlight = async (req, res) => {
    try {
        // 1. Get data from the request body
        const { airline, flightNumber, origin, destination, departureTime, price } = req.body;

        // 2. Validation (Simple check)
        if (!airline || !flightNumber || !origin || !destination || !price) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        // 3. Create the flight
        const flight = await Flight.create({
            airline,
            flightNumber,
            origin,
            destination,
            departureTime,
            price,
            availableSeats: 60 // Default value
        });

        res.status(201).json(flight);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getFlights = async (req, res) => {
    try {
        // Check if user sent search filters (e.g. ?origin=NYC&destination=London)
        const { origin, destination } = req.query;
        
        let query = {};

        // If they provided a search term, add it to the database query
        if (origin) query.origin = origin;
        if (destination) query.destination = destination;

        // Find flights based on the query
        const flights = await Flight.find(query);

        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a flight
// @route   DELETE /api/flights/:id
const deleteFlight = async (req, res) => {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).json({ message: 'Flight not found' });
        }
        
        await flight.deleteOne();
        res.json({ message: 'Flight removed' });
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { addFlight, getFlights, deleteFlight };