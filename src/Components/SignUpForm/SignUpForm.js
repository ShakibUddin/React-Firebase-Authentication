import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import useContactValidator from '../../Hooks/useContactValidator';
import useEmailValidator from '../../Hooks/useEmailValidator';
import usePasswordValidator from '../../Hooks/usePasswordValidator';

const SignUpForm = () => {
    let [error, setError] = useState("");
    let [email, handleEmailInput, emailError] = useEmailValidator();
    let [password, setPassword, handlePasswordInput, passwordError] = usePasswordValidator();
    let [contact, handleContactInput, contactError] = useContactValidator();
    let [confirmPasswordError, setConfirmPasswordError] = useState("");

    let history = useHistory();

    function handleClick() {
        history.push('/signin');
    }

    let handleFirebaseEmailSignUp = (e) => {
        const auth = getAuth();
        console.log(email, contact, password);
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                setError(errorMessage);
            });
    }

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
        <form onSubmit={(e) => { handleFirebaseEmailSignUp(e) }} className="form">
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
            {
                error.length > 0 && <p className="error-label">{error}</p>
            }
            <input type="submit" value="Create Account" />
            <p>Already have an account? <span onClick={handleClick}>Login</span></p>
        </form>
    );
};

export default SignUpForm;