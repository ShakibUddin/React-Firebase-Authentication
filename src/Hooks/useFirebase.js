import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { } from "react-router-dom";
import initializeFirebase from '../Firebase/firebase.init';

initializeFirebase();

let useFirebase = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    let [error, setError] = useState("");
    let [user, setUser] = useState({});

    let handleGoogleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
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
        return signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const { displayName, photoURL, email } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(loggedInUser);
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
                    console.log("User with same email already exists")
                }
            })
    }

    let handleFirebaseEmailSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                setError("");
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                if (errorMessage === 'Firebase: Error (auth/wrong-password).' || errorMessage === 'Firebase: Error (auth/user-not-found).') {
                    setError("Invalid email/password");
                }

            });
    }

    let handleFirebaseEmailSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                sendEmailVerificationLink().then((result) => {
                    console.log(result);
                    setUser(user);
                    setError("");
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(error.code);
                setError(errorMessage);
            });
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
        })
    }, []);

    let sendEmailVerificationLink = () => {
        return sendEmailVerification(auth.currentUser);
    }
    let logout = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
    }

    return {
        handleGoogleSignIn,
        handleGithubSignIn,
        handleFirebaseEmailSignIn,
        handleFirebaseEmailSignUp,
        error,
        user,
        logout
    }
}

export default useFirebase;