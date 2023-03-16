import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './register.css'
import { remoteUrl } from '../../models/URL'

function Register() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const data = {
        "username": username,
        "password": password
    };
    let navigate = useNavigate();

    async function registerSubmit() {
            try { 
                const response = await axios.post(remoteUrl + '/users', data);
                if (response.status === 200) {
                    alert(response.data.message);
                    navigate('/');
                } else {
                    alert(response.data.message);
                }
            } catch(error: any) {
                if (error.response && error.response.data) {
                    alert(error.response.data.errors);
                  } else {
                    alert('An error occurred');
                  }
                }
        }
    

    return ( 
        <form title="register" className="registrationForm" onSubmit={(event) => {event.preventDefault() }}>
            <h1>Register</h1>
            <input onChange={(e)=> { setUsername((e.target.value)) }} 
                value={username} 
                type="text" 
                name="username" 
                placeholder="Username"
            />
            <input onChange={(e)=> { setPassword((e.target.value)) }} 
                value={password} 
                type="text" 
                name="password" 
                placeholder="Password"
            />
            <div className="registerFormSubmit">
                <button type="submit" className="registerbtn" onClick={registerSubmit}>Register</button>
                <button className="loginLink" onClick={() => navigate("/")}>Login</button>
            </div>
        </form>
    )
}

export default Register;
