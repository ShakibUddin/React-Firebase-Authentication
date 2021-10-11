import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useContactValidator from '../../Hooks/useContactValidator';
import useEmailValidator from '../../Hooks/useEmailValidator';
import usePasswordValidator from '../../Hooks/usePasswordValidator';

const SignUpForm = () => {
    let [email, handleEmailInput, emailError] = useEmailValidator();
    let [password, setPassword, handlePasswordInput, passwordError] = usePasswordValidator();
    let [contact, handleContactInput, contactError] = useContactValidator();
    let [confirmPasswordError, setConfirmPasswordError] = useState("");

    let history = useHistory();

    function handleClick() {
        history.push('/signin');
    }

    function handleConfirmPasswordInput(e) {
        if (password !== e.target.value) {
            setConfirmPasswordError("Passwords don't match");
        }
        else {
            setPassword(e.target.value);
            setConfirmPasswordError("");
        }
    }

    function handleFormSubmit(e) {
        console.log(email, contact, password);
        e.preventDefault();
    }
    return (
        <form onSubmit={(e) => { handleFormSubmit(e) }} className="form">
            <h1>Sign Up</h1>
            <input required minLength="3" maxLength="30" type="email" name="" onBlur={e => { handleEmailInput(e) }} placeholder="Enter Email" />
            {
                emailError.length > 0 && <p className="error-label">{emailError}</p>
            }
            <input required type="number" name="" onBlur={e => { handleContactInput(e) }} placeholder="Enter Contact Number" />
            {
                contactError.length > 0 && <p className="error-label">{contactError}</p>
            }
            <input type="password" name="" onBlur={e => { handlePasswordInput(e) }} placeholder="Enter Password" />
            {
                passwordError.length > 0 && <p className="error-label">{passwordError}</p>
            }
            <input required minLength="1" maxLength="20" type="password" name="" onBlur={e => { handleConfirmPasswordInput(e) }} placeholder="Confirm Password" />
            {
                confirmPasswordError.length > 0 && <p className="error-label">{confirmPasswordError}</p>
            }
            <input type="submit" value="Create Account" />
            <p>Already have an account? <span onClick={handleClick}>Login</span></p>
        </form>
    );
};

export default SignUpForm;