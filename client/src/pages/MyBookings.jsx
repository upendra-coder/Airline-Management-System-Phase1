import { useEffect, useState } from 'react';
import axios from 'axios';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };

            try {
                const response = await axios.get('http://localhost:5000/api/bookings/mybookings', config);
                setBookings(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBookings();
    }, []);

    const handleCancel = async (bookingId) => {
        if(!window.confirm("Are you sure you want to cancel?")) return;

        const user = JSON.parse(localStorage.getItem('user'));
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        try {
            await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, config);
            alert("Booking Cancelled");
            setBookings(bookings.filter(b => b._id !== bookingId));
        } catch (error) {
            alert("Failed to cancel");
        }
    };

    return (
        <div>
            <h1>My Bookings 🎟️</h1>
            <div style={{ marginTop: '20px' }}>
                {bookings.length === 0 ? <p>No bookings found.</p> : bookings.map((booking) => {
                    
                    // 🛑 CRITICAL FIX: Check if flight exists!
                    // If Admin deleted the flight, 'booking.flight' will be null.
                    if (!booking.flight) {
                        return (
                            <div key={booking._id} style={{ ...styles.ticket, backgroundColor: '#ffebee' }}>
                                <h3 style={{ color: 'red' }}>Flight Cancelled / Deleted</h3>
                                <p>This flight has been removed by the airline.</p>
                                <button 
                                    onClick={() => handleCancel(booking._id)}
                                    style={{ backgroundColor: 'red', marginTop: '10px' }}
                                >
                                    Remove Ticket
                                </button>
                            </div>
                        );
                    }

                    // If flight exists, render normally
                    return (
                        <div key={booking._id} style={styles.ticket}>
                            <h3>{booking.flight.airline} ({booking.flight.flightNumber})</h3>
                            <p>{booking.flight.origin} ➝ {booking.flight.destination}</p>
                            <p><strong>Date:</strong> {new Date(booking.flight.departureTime).toLocaleString()}</p>
                            <p><strong>Status:</strong> <span style={{color: 'green'}}>Confirmed</span></p>

                            <button 
                                onClick={() => handleCancel(booking._id)}
                                style={{ backgroundColor: 'red', marginTop: '10px' }}
                            >
                                Cancel Ticket
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const styles = {
    ticket: {
        border: '1px solid #ddd',
        padding: '15px',
        marginBottom: '15px',
        borderRadius: '8px',
        backgroundColor: '#fff'
    }
};

export default MyBookings;