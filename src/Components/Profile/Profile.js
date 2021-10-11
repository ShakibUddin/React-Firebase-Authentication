import React from 'react';
import { useHistory } from 'react-router';
import useUserSignIn from '../../Hooks/useUserSignIn';

const Profile = () => {
    let [user] = useUserSignIn();
    let history = useHistory();
    let handleLogOut = () => {
        // signOut(auth).then(() => {
        //     // Sign-out successful.
        //     history.push("/signin");
        // }).catch((error) => {
        //     console.log(error);
        // });

    }
    return (
        <div>
            <button onClick={handleLogOut}>Logout</button>
            <img src={user.photo} alt="" />
            <h1>{user.name}</h1>
            <h3>{user.email}</h3>
        </div>
    );
};
export default Profile;