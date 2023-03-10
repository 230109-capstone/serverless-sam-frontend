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
                console.log(response);
                if (response.status === 200) {
                    alert(response.data.message);
                    navigate('/');
                } else {
                    alert(response.data.message);
                }
            } catch(error: any) {
                alert(error.response.data.errors);
            };
        }
    

    return ( 
        <>
        <div className="registration">
        <h3 className="header">Register</h3>
        <form title="register" onSubmit={(event) => {event.preventDefault() }}>
            <p><input className="input" onChange={(e)=> { setUsername((e.target.value)) }} value={username} type="text" name="username" placeholder="Username"/></p>
            <p><input className="input" onChange={(e)=> { setPassword((e.target.value)) }} value={password} type="text" name="password" placeholder="Password"/></p>
            <button className="registerbtn" onClick={registerSubmit}>Create Account</button>
        </form>

        <Link className="loginLink" to='/'>Already have an account?</Link>
        </div>

        </>
    )
}

export default Register;
