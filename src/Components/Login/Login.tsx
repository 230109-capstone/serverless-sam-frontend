import './Login.css'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/slices/userSlice";
import {AppDispatch, RootState} from "../../redux/Store";
import {LoginUser} from "../../models/User";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch: AppDispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()

    function usernameHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function passwordHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function submitHandler(event: React.FormEvent) {
        event.preventDefault()
        const user: LoginUser = {
            username,
            password
        }

        dispatch(login(user));
    }

    useEffect(() => {
        if (userState.isLoggedIn) {
            navigate('/view-reimbursements')
        }
    }, [userState.isLoggedIn])

    return (
        <form name="loginForm" id="loginForm" onSubmit={submitHandler}>
            <h1 className="header">Login</h1>

            {userState.loginError ? <h5>Incorrect email or password </h5> : <></>}
            <input type="text" 
                className="inputLogin" 
                name="username" 
                placeholder="Username"
                onChange={usernameHandler}
                required
            />

            <input type="password" 
                className="inputLogin" 
                name='password' 
                placeholder='Password'
                onChange={passwordHandler}
                required
            />
            <div className="loginFormSubmit">
                <button type="submit" id="loginBtn" value="Log In">Login</button>
                <button className="registerLinkFromLogin" onClick={() => navigate("/register")}>Register</button>
            </div>
        </form>
    )
}

export default Login;
