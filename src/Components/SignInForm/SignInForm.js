import React from 'react';
import { useHistory } from "react-router-dom";
import useEmailValidator from '../../Hooks/useEmailValidator';
import usePasswordValidator from '../../Hooks/usePasswordValidator';
import './SignInForm.css';

const SignInForm = () => {
    let [email, handleEmailInput, emailError] = useEmailValidator();
    let [password, , handlePasswordInput, passwordError] = usePasswordValidator();
    let history = useHistory();

    function handleClick() {
        history.push('./signup');
    }

    function handleFormSubmission(e) {
        console.log(email, password);
        e.preventDefault();
    }
    return (
        <form onSubmit={e => { handleFormSubmission(e) }} className="form">
            <h1>SignIn</h1>
            <input required type="email" name="" onBlur={e => { handleEmailInput(e) }} placeholder="Enter Email" />
            {
                emailError.length > 0 && <p className="error-label">{emailError}</p>
            }
            <input required type="password" name="" onBlur={e => { handlePasswordInput(e) }} placeholder="Enter Password" />
            {
                passwordError.length > 0 && <p className="error-label">{passwordError}</p>
            }
            <input type="submit" value="LOGIN" />

            <p>Don't have an account? <span onClick={handleClick}>Register</span></p>
        </form>
    );
};

export default SignInForm;