import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './SignInForm.css';

const SignInForm = () => {
    let [inputData, setInputData] = useState({
        email: "",
        password: ""
    });
    let [error, setError] = useState("");

    let history = useHistory();

    function handleClick() {
        history.push('./signup');
    }
    function handleEmailInput(e) {
        console.log(e.target.value);
    }
    function handlePasswordInput(e) {
        console.log(e.target.value);
    }
    return (
        <form className="form">
            <h1>SignIn</h1>
            <input type="text" name="" onBlur={e => { handleEmailInput(e) }} placeholder="Enter Email" />
            <input type="password" name="" onBlur={e => { handlePasswordInput(e) }} placeholder="Enter Password" />
            <button>Login</button>
            <p>Don't have an account? <span onClick={handleClick}>Register</span></p>
        </form>
    );
};

export default SignInForm;