const express = require('express');
const router = express.Router();
const { bookFlight, cancelBooking, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authmiddleware');

// Import validation
const validate = require('../middleware/validate');
const { bookingSchema } = require('../schemas/validationSchemas');

router.post('/',protect,validate(bookingSchema), bookFlight);
router.get('/mybookings',protect, getMyBookings);
router.delete('/:id',protect, cancelBooking);

module.exports = router;