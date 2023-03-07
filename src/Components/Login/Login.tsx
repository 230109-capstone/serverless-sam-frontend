import './Login.css'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/slices/userSlice";
import {AppDispatch, RootState} from "../../redux/Store";
import {LoginUser} from "../../models/User";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

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

        dispatch(login(user))
            .then(() => {
                navigate('/home')
            })
    }

    useEffect(() => {
        if (userState.isLoggedIn) {
            navigate('/home')
        }
    }, [userState.isLoggedIn])

    return (
        <form name="loginForm" id="loginForm" onSubmit={submitHandler}>
            <h3 className="header">Login</h3>

            {userState.loginError ? <h3>Incorrect email or password </h3> : <></>}

            <p><input type="text" className="inputLogin" name="username" placeholder="username"
                      onChange={usernameHandler}
                      required/></p>

            <p><input type="password" className="inputLogin" name='password' placeholder='password'
                      onChange={passwordHandler}
                      required/></p>

            <input type="submit" id="loginBtn" value="Log In"/>
            <Link className="registerLink" to='/register'>Don't have an account?</Link>


        </form>
    )
}

export default Login;
