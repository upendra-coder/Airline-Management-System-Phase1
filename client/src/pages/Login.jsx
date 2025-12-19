import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // state to hold from data
    const [fromData, setFromData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = fromData;
    const navigate = useNavigate();

    // handling input changes
    const onChange = (e) => {
        setFromData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // handle form submit
    const onSubmit = async(e) => {
        e.preventDefault(); // to stop page refresing 

        try{
           // API call
           const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password,
           });

           // if success
           if(response.data){
            // save token in browser storage
            localStorage.setItem('user', JSON.stringify(response.data));
            alert('Login Successful');
            navigate('/') // redirect to dashboard
           }
        } catch (error){
           console.error(error);
           alert('Invalid Credentials');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <p>Sign in to book flights</p>
            
            <form onSubmit={onSubmit}>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;