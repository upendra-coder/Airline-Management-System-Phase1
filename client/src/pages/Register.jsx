import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;
    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }));
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        try{
          // call the register api
          const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password
            });

            if(response.data) {
                // saving token (auto login afer register)
                localStorage.setItem('user', JSON.stringify(response.data));
                alert('Registration Successful! Welcome');
                navigate('/');
            }

        } catch (error) {
                console.error(error);
                alert(error.response?.data?.message || 'Registration failed');
        } 
    };

    return (
        <div>
            <h1>Register</h1>
            <p>Create an account to start booking</p>
            
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    value={name} 
                    placeholder="Enter your name" 
                    onChange={onChange}
                    required
                />
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    placeholder="Enter your email" 
                    onChange={onChange}
                    required
                />
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    placeholder="Enter password" 
                    onChange={onChange} 
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;