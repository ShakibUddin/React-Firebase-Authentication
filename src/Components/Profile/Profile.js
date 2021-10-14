import React from 'react';
import useAuth from '../../Hooks/useAuth';
import './Profile.css';
const Profile = () => {
    const {
        user
    } = useAuth();
    return (
        <div className="profile-div">
            <img src={user.photo} alt="" />
            <h1>{user.name}</h1>
            <h3>{user.email} ({user.emailVerified ? "Verified" : "Not Verified"})</h3>
        </div>
    );
};
export default Profile;