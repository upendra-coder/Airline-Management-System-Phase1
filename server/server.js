const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');

dotenv.config();
connectDB();     

const app = express();
app.use(express.json());  // Allows the server to accept JSON data in the body
app.use(cors());   // Allows frontend to connect

app.get('/', (req,res) => {
    res.send("Airline Management API is running");
}); 

const PORT = process.env.PORT || 5000;

app.use('/api/auth', require('./routes/auth'));
app.use('/api/flights', require('./routes/flights')); 
app.use('/api/bookings', require('./routes/bookings'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});