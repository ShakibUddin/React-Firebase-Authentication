import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import "./Header.css";

const Header = () => {
    let { user, logout } = useAuth();
    return (
        <nav>
            {user.email && <Link to="/profile">Profile</Link>}
            {!user.email && <Link to="/signin">Login</Link>}
            {!user.email && <Link to="/signup">Register</Link>}
            {user.email && <Link onClick={logout} to="/signin">Logout</Link>}
        </nav>
    );
};

export default Header;