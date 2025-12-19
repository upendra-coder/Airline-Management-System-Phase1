const express = require('express');
const router = express.Router();
const { addFlight, getFlights, deleteFlight } = require('../controllers/flightController');
const { protect, admin } = require('../middleware/authmiddleware');

// Import validation
const validate = require('../middleware/validate');
const { flightSchema } = require('../schemas/validationSchemas');

// Route to Add a Flight (POST) and Get Flights (GET)
router.get('/', getFlights);

// Protected Route (Only Admin can add flights)
router.post('/', protect, admin, validate(flightSchema), addFlight);

// delete route (protected + admin only)
router.delete('/:id', protect, admin, deleteFlight);

module.exports = router;