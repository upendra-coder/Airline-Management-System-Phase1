import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFlight = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        airline: '',
        flightNumber: '',
        origin: '',
        destination: '',
        departureTime: '',
        price: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const config = { headers: {Authorization: `Bearer ${user.token}`} };

        try{
          await axios.post('http://localhost:5000/api/flights', formData, config);
          alert('Flight Added Successfully!');
          navigate('/');
        } catch (error){
            alert('Failed to add flight. Are you an Admin?');
        }
    }

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h1>Add New Flight ✈️</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input name="airline" placeholder="Airline (e.g. Indigo)" onChange={handleChange} required />
                <input name="flightNumber" placeholder="Flight No (e.g. 6E-123)" onChange={handleChange} required />
                <input name="origin" placeholder="Origin (e.g. Delhi)" onChange={handleChange} required />
                <input name="destination" placeholder="Destination (e.g. Mumbai)" onChange={handleChange} required />
                
                <label>Departure Time:</label>
                <input type="datetime-local" name="departureTime" onChange={handleChange} required />
                
                <input type="number" name="price" placeholder="Price (₹)" onChange={handleChange} required />
                
                <button type="submit" style={{ backgroundColor: '#f0ad4e', color: 'black' }}>Add Flight</button>
            </form>
        </div>
    );
}

export default AddFlight;