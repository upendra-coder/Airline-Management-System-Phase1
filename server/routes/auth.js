const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Import the middleware and schemas
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../schemas/validationSchemas');

// The route is actually /api/auth/register
router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

module.exports = router;