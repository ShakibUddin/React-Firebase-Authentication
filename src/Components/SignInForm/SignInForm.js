import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import useEmailValidator from '../../Hooks/useEmailValidator';
import usePasswordValidator from '../../Hooks/usePasswordValidator';
import useUserSignIn from '../../Hooks/useUserSignIn';
import './SignInForm.css';


const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const SignInForm = () => {
    const auth = getAuth();
    let [error, setError] = useState("");
    let [user, setUser] = useUserSignIn();
    let [email, handleEmailInput, emailError] = useEmailValidator();
    let [password, , handlePasswordInput, passwordError] = usePasswordValidator();
    let history = useHistory();

    let handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    let handleGithubSignIn = () => {
        signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const { displayName, photoURL, email } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(loggedInUser);
                console.log(result.user);
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
                    console.log("User with same email already exists")
                }
            })
    }

    let handleEmailSignIn = (e) => {
        console.log(email, password);
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                setError("");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                    setError("Invalid email/password");
                }

            });
    }
    let handleClick = () => {
        history.push('./signup');
    }

    return (
        <form onSubmit={e => { handleEmailSignIn(e) }} className="form">
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

            <p>Don't have an account? <span onClick={handleClick}>Register</span></p>
            <p>or</p>
            <div className="login-options">
                <button onClick={handleGoogleSignIn}>Google</button>
                <button onClick={handleGithubSignIn}>Github</button>
            </div>
        </form>
    );
};

export default SignInForm;