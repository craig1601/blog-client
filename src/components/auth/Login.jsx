import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import UserContext from '../../context/UserContext'
import ErrorMessage from '../misc/ErrorMessage'

const Login = () => {

    const [email, setEmail] = useState();
    const[password, setPassword] = useState();
    const [error, setError] = useState("");

    const history = useHistory();
    const {setUserData} = useContext(UserContext);

    

    const submitForm = async (event) => {
        event.preventDefault();

        try{

        const loginRes = await Axios.post("https://craig-blog-site.herokuapp.com/users/login",{
            email,
            password
        })

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        });

        localStorage.setItem("auth-token",loginRes.data.token);

        history.push("/");

    }
    catch(err){
        err.response.data.msg && setError(err.response.data.msg)
    }
    }

    return(
        <div className="outer-login">
            <div className="inner-login">
            <form onSubmit={submitForm} >
                <h1>Log In</h1>

                   <p className="login-username"> <input  type="text" name="email" placeholder="Email" onChange={e => {setEmail(e.target.value)}}/></p>
                   <p className="login-pw"> <input  type="password" name="password" placeholder="Password" onChange={e => {setPassword(e.target.value)}}/></p>
                   <p> <button type="submit" >Log in</button> </p>
            </form>
            </div>
            { error && <ErrorMessage msg={error} clearError={()=>setError(undefined)} />}
        </div>
    )
}

export default Login;