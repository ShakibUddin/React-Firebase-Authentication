import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import "./Header.css";

const Header = () => {
    const { user, logout } = useAuth();
    return (
        <nav>
            <Link to="/home">Home</Link>
            <Link to="/profile">Profile</Link>
            {user.email ? <Link onClick={logout} to="/home">Logout</Link> : <Link to="/signin">Login</Link>}
        </nav>
    );
};

export default Header;