import React, { useState } from 'react';
import { useHistory } from 'react-router';

const SignUpForm = () => {
    let [inputData, setInputData] = useState({
        name: "",
        email: "",
        contact: "",
        password: ""
    });
    let [error, setError] = useState("");

    let history = useHistory();

    function handleClick() {
        history.push('./signin');
    }
    function handleEmailInput(e) {
        console.log(e.target.value);
    }
    function handlePasswordInput(e) {
        console.log(e.target.value);
    }
    function handleContactInput(e) {
        console.log(e.target.value);
    }
    function handleFormSubmit(e) {
        console.log(e.target.value);
        setInputData(e.target.value);
        e.preventDefault();
    }
    return (
        <form onSubmit={(e) => { handleFormSubmit(e) }} className="form">
            <h1>Sign Up</h1>
            <input type="text" name="" onBlur={e => { handleEmailInput(e) }} placeholder="Enter Email" />
            <input type="text" name="" onBlur={e => { handleContactInput(e) }} placeholder="Enter Contact Number" />
            <input type="password" name="" onBlur={e => { handlePasswordInput(e) }} placeholder="Enter Password" />
            <input type="password" name="" onBlur={e => { handlePasswordInput(e) }} placeholder="Confirm Password" />
            <button>Create Account</button>
            <p>Already have an account? <span onClick={handleClick}>Login</span></p>
        </form>
    );
};

export default SignUpForm;