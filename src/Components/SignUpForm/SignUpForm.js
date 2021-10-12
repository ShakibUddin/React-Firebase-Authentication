import React, { useState } from 'react';
import { Link } from "react-router-dom";
import useAuth from '../../Hooks/useAuth';
import useEmailValidator from '../../Hooks/useEmailValidator';
import usePasswordValidator from '../../Hooks/usePasswordValidator';

const SignUpForm = () => {
    let {
        handleFirebaseEmailSignUp,
        error,
    } = useAuth();
    let [email, handleEmailInput, emailError] = useEmailValidator();
    let [password, setPassword, handlePasswordInput, passwordError] = usePasswordValidator();
    let [confirmPasswordError, setConfirmPasswordError] = useState("");

    let handleConfirmPasswordInput = (e) => {
        if (password !== e.target.value) {
            setConfirmPasswordError("Passwords don't match");
        }
        else {
            setPassword(e.target.value);
            setConfirmPasswordError("");
        }
    }

    return (
        <form onSubmit={(e) => { handleFirebaseEmailSignUp(e, email, password) }} className="form">
            <h1>Sign Up</h1>
            <input required minLength="3" maxLength="30" type="email" name="" onBlur={e => { handleEmailInput(e) }} placeholder="Enter Email" />
            {
                emailError.length > 0 && <p className="error-label">{emailError}</p>
            }
            <input type="password" name="" onBlur={e => { handlePasswordInput(e) }} placeholder="Enter Password" />
            {
                passwordError.length > 0 && <p className="error-label">{passwordError}</p>
            }
            <input required minLength="1" maxLength="20" type="password" name="" onBlur={e => { handleConfirmPasswordInput(e) }} placeholder="Confirm Password" />
            {
                confirmPasswordError.length > 0 && <p className="error-label">{confirmPasswordError}</p>
            }
            {
                error.length > 0 && <p className="error-label">{error}</p>
            }
            <input type="submit" value="Create Account" />
            <p>Already have an account? <Link to='./signin'>Login</Link></p>
        </form>
    );
};

export default SignUpForm;