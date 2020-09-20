import React, {useContext} from 'react';
import {useHistory, Link} from 'react-router-dom';
import UserContext from '../../context/UserContext'

const AuthOptions = () => {

    const {userData, setUserData} = useContext(UserContext);

    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: null,
            user: null
        });
        localStorage.setItem("auth-token", "");
        history.push('/');
    }

    return(
        <nav className="auth-options">
        {
            userData.user ? (
                <>
                <Link  className="my-post-btn" to={"/user?id="+userData.user.userName}>
                My Posts
                </Link>                
                <button onClick={logout}>Log out</button>
                </>
            ) : 
            <>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
            </>
        }
            
        </nav>
    )
}

export default AuthOptions;