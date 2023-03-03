import React, { useState } from "react";
import { LoginUser } from "../../models/User";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './register.css'
import { error } from "console";

function Register() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    let navigate = useNavigate();

    async function registerSubmit() {
        const response = await axios.post('someaddressforlambda', {"username": username, "password": password});
        try{
            if (response.status === 200) {
              alert('Successfully Registered');
              navigate('/login');
          }
        }catch(error) {
            alert(error);
          };
        };
    

    return ( 
        <>
        <div className="registration">
        <h3 className="header">Register</h3>
        <form title="register" onSubmit={(event) => {event.preventDefault() }}>
            <p><input className="input" onChange={(e)=> { setUsername((e.target.value)) }} value={username} type="text" name="username" placeholder="Username"/></p>
            <p><input className="input" onChange={(e)=> { setPassword((e.target.value)) }} value={password} type="text" name="password" placeholder="Password"/></p>
            <button className="registerbtn" onClick={registerSubmit}>Create Account</button>
        </form>
        <Link className="loginLink" to='/login'>Already have an account?</Link>
    </div>
        </>
    )
}

export default Register;