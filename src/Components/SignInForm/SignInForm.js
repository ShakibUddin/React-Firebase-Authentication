
import React from 'react';
import { Link } from "react-router-dom";
import useAuth from '../../Hooks/useAuth';
import useEmailValidator from '../../Hooks/useEmailValidator';
import usePasswordValidator from '../../Hooks/usePasswordValidator';
import './SignInForm.css';

const SignInForm = () => {
    let {
        handleGoogleSignIn,
        handleGithubSignIn,
        handleFirebaseEmailSignIn,
        error,
        user
    } = useAuth();
    let [email, handleEmailInput, emailError] = useEmailValidator();
    let [password, , handlePasswordInput, passwordError] = usePasswordValidator();


    return (
        <form onSubmit={e => { handleFirebaseEmailSignIn(e, email, password) }} className="form">
            <h1>SignIn</h1>
            <input required type="email" name="" onBlur={e => { handleEmailInput(e) }} placeholder="Enter Email" />
            {
                emailError.length > 0 && <p className="error-label">{emailError}</p>
            }
            <input required type="password" name="" onBlur={e => { handlePasswordInput(e) }} placeholder="Enter Password" />
            {
                passwordError.length > 0 && <p className="error-label">{passwordError}</p>
            }
            {
                error.length > 0 && <p className="error-label">{error}</p>
            }

            <input type="submit" value="LOGIN" />

            <p>Don't have an account? <Link to='./signup'>Register</Link></p>
            <p>or</p>
            <div className="login-options">
                <button onClick={handleGoogleSignIn}>Google</button>
                <button onClick={handleGithubSignIn}>Github</button>
            </div>
        </form>
    );
};

export default SignInForm;