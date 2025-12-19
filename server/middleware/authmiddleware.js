const jwt = require('jsonwebtoken');
const User = require('../models/User');

// verify if the user is logged in
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
            
            // Find user in DB
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ message: 'User not found in DB' });
            }
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.log("❌ No Token provided in headers");
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// verify if the user is admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin === true) { 
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};


module.exports = { protect, admin };