import React from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions'

const Header = () => {
    return(
        <header id="header">
        <Link to="/">
        <h2 className="page-name">Blog Page</h2>
        </Link>
        <AuthOptions />
        </header>
    )
}

export default Header;