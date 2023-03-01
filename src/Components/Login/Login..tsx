import './Login.css'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/slices/userSlice";
import {AppDispatch, RootState} from "../../redux/Store";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch: AppDispatch = useDispatch();
    const userState = useSelector((state: RootState)=>state.user)

    function usernameHandler(event: any) {
        setUsername(event.target.value)
    }

    function passwordHandler(event: any) {
        setPassword(event.target.value)
    }

    function submitHandler(event: any) {
        event.preventDefault()
        const user = {
            username,
            password
        }

        dispatch(login(user))
            .then(() => {
                //Todo: Add a navigate
            })
    }

    useEffect(()=>{
        if(userState.isLoggedIn){
            //Todo: add navigate
        }
    }, [userState.isLoggedIn])

    return (
        <form name="loginForm" id="loginForm" onSubmit={submitHandler}>
            <h1>Login</h1>

            {userState.loginError ? <h3>Incorrect email or password </h3> : <></>}

            <label>Username</label>
            <input type="text" id="usernameLogin" name="username" placeholder="username" onChange={usernameHandler}
                   required/>

            <label>Password</label>
            <input type="password" id="passwordLogin" name='password' placeholder='password' onChange={passwordHandler}
                   required/>

            <input type="submit" id="loginButton" value="Log In"/>
        </form>
    )
}

export default Login;