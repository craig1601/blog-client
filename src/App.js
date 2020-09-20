import React, { useState, useEffect } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Axios from 'axios';
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import UserContext from './context/UserContext';
//import Footer from './components/layout/Footer'
import './styles.css';
import Create from './components/pages/Create';
import PostExpand from './components/pages/PostExpand';
import User from './components/pages/User';


function App() {

const [userData,setUserData] = useState({
  token: undefined,
  user: undefined
});


useEffect(() => {
  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth-token');
    if(token === null){
      token = "";
      localStorage.setItem("auth-token", token);
    }
    const tokenRes = await Axios.post('https://craig-blog-site.herokuapp.com/users/tokenCheck',
    null,
    {headers: {"x-auth-token" : token}});
    
    if(tokenRes.data) {
      const userRes = await Axios.get('https://craig-blog-site.herokuapp.com/users/', {headers: {"x-auth-token": token}});
      setUserData({
        token,
        user: userRes.data
      })
    }

    
  }

  checkLoggedIn();
},[]);

  return (
    <>
     <BrowserRouter>
     <UserContext.Provider value={{userData,setUserData} }>
        <Header />
        <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/login" component={Login} />
         <Route path="/register" component={Register} />
         <Route path="/create" component={Create} />
         <Route path="/posts" component={PostExpand} />
         <Route path="/user" component={User} />
         </Switch>
     </UserContext.Provider>    
     </BrowserRouter>
    </>
  );
}

export default App;
