const z = require('zod');

// 1. User Registration Rules
const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

// 2. User Login Rules
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});

// 3. Add Flight Rules (Admin)
const flightSchema = z.object({
    airline: z.string().min(2, "Airline name is required"),
    flightNumber: z.string().min(2, "Flight number is required"),
    origin: z.string().min(2, "Origin is required"),
    destination: z.string().min(2, "Destination is required"),
    
    // Fix 1: Accept any valid date string (don't enforce strict ISO)
    departureTime: z.coerce.date(), 

    // Fix 2: Convert "5000" (string) to 5000 (number) automatically
    price: z.coerce.number().positive("Price must be a positive number")
});

// 4. Booking Rules
const bookingSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    flightId: z.string().min(1, "Flight ID is required")
});

module.exports = { 
    registerSchema, 
    loginSchema, 
    flightSchema,
    bookingSchema 
};