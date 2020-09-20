import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import UserContext from '../../context/UserContext'
import ErrorMessage from '../misc/ErrorMessage'

const Register = () => {

    const history = useHistory();
    const {setUserData} = useContext(UserContext);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [passCheck, setPassCheck] = useState();
    const [error, setError] = useState("");

    const submitForm = async (event) => {
        event.preventDefault();
        try{
        const newUser = {
            userName:username,
            email,
            password:pass,
            passwordCheck:passCheck
        };

        await Axios.post("https://craig-blog-site.herokuapp.com/users/register",newUser);
        const loginRes = await Axios.post("https://craig-blog-site.herokuapp.com/users/login",{
            email,
            password:pass
        })

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    }
    catch(err){
        err.response.data.msg && setError(err.response.data.msg)
    }
    }

    return(

        <div className="outer-login">
            <div className="inner-login register">
                <form onSubmit={submitForm} >
            <h1>Register</h1>
                    
                   <p className="login-username">
                    <input  type="text" name="reg-username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                     </p>
                   <p className="login-pw">
                    <input  type="text" name="reg-email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </p>
                   <p className="login-pw">
                   <input  type="password" name="reg-pass" placeholder="Password" onChange={e => setPass(e.target.value)}/>
                   </p>
                   <p className="login-pw"><input  type="password" name="reg-pass-check" placeholder="Confirm password" onChange={e => setPassCheck(e.target.value)} />
                   </p>
                   <p> <button type="submit" >Submit</button> </p>
                </form>
            </div>
            { error && <ErrorMessage msg={error} clearError={()=>setError(undefined)} />}
        </div>
    )
}

export default Register;