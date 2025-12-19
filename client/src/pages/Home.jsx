import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    // 1. Fetch Flights automatically when page loads
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flights');
                setFlights(response.data);
            } catch (error) {
                console.log("Error fetching flights:", error);
            }
        };

        fetchFlights();
    }, []);

    // 2. Handle Booking Logic
    const handleBook = async (flightId) => {
        // Get the logged-in user from storage
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            alert("Please Login to book a ticket!");
            navigate('/login');
            return;
        }

        console.log("User found:", user.name);
        console.log("Token being sent:", user.token);

        try {
            const config = {
                headers: { 
                    Authorization: `Bearer ${user.token}` 
                }
            };

            // Call the Booking API
            await axios.post('http://localhost:5000/api/bookings', {
                userId: user._id, // Send the User ID from storage
                flightId: flightId
            }, config);

            alert('Booking Confirmed! ✈️');
            
            // Optional: Refresh page to update seat count
            window.location.reload();

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Booking Failed');
        }
    };

    //  ADD DELETE LOGIC
    const handleDelete = async (flightId) => {
        if(!window.confirm("Are you sure you want to delete this flight?")) return;

        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/flights/${flightId}`, config);
            
            alert("Flight Deleted!");
            // Remove from screen instantly
            setFlights(flights.filter(f => f._id !== flightId));
        } catch (error) {
            alert("Failed to delete. Are you an Admin?");
        }
    };

    return (
        <div>
            <h1>Available Flights ✈️</h1>
            
            {/* Display the list of flights */}
            <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
                {flights.map((flight) => (
                    <div key={flight._id} style={styles.card}>
                        <h3>{flight.airline} - {flight.flightNumber}</h3>
                        <p><strong>Route:</strong> {flight.origin} ➝ {flight.destination}</p>
                        <p><strong>Time:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
                        <p><strong>Price:</strong> ₹{flight.price}</p>
                        
                        {/* Dynamic Seat Count */}
                        <p style={{ color: flight.availableSeats < 5 ? 'red' : 'green' }}>
                            <strong>Seats Left:</strong> {flight.availableSeats}
                        </p>

                        <button 
                            onClick={() => handleBook(flight._id)}
                            disabled={flight.availableSeats === 0}
                            style={{ 
                                backgroundColor: flight.availableSeats === 0 ? '#ccc' : '#28a745',
                                cursor: flight.availableSeats === 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {flight.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                        </button>

                        {user && user.isAdmin && (
                                <button 
                                    onClick={() => handleDelete(flight._id)}
                                    style={{ backgroundColor: 'red' }}
                                >
                                    Delete Flight
                                </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Simple CSS for the Card look
const styles = {
    card: {
        border: '1px solid #ddd',
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }
};

export default Home;