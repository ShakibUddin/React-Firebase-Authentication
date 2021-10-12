import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from '../Firebase/firebase.init';

initializeFirebase();

let useFirebase = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    let [error, setError] = useState("");
    let [user, setUser] = useState({});
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

    let handleFirebaseEmailSignIn = (e, email, password) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                setError("");
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
                    setError("Invalid email/password");
                }

            });
    }

    let handleFirebaseEmailSignUp = (e, email, password) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
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