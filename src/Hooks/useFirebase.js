import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { } from "react-router-dom";
import initializeFirebase from '../Firebase/firebase.init';

initializeFirebase();

const useFirebase = () => {
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();
    const [error, setError] = useState("");
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
            .then(result => {
                const { displayName, email, photoURL, emailVerified } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified
                };
                setUser(loggedInUser);
            })
            .catch(error => {
                console.log(error.message);
            })
            .finally(() => setIsLoading(false));
    }
    const handleGithubSignIn = () => {
        return signInWithPopup(auth, gitHubProvider)
            .then(result => {
                const { displayName, email, photoURL, emailVerified } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified
                };
                setUser(loggedInUser);
            })
            .catch(error => {
                if (error.message === "Firebase: Error (auth/account-exists-with-different-credential).") {
                    console.log("User with same email already exists")
                }
            })
            .finally(() => setIsLoading(false));
    }

    const handleFirebaseEmailSignIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user);
                setError("");
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage === 'Firebase: Error (auth/wrong-password).' || errorMessage === 'Firebase: Error (auth/user-not-found).') {
                    setError("Invalid email/password");
                }

            }).finally(() => setIsLoading(false));
    }

    const handleFirebaseEmailSignUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                sendEmailVerificationLink().then((result) => {
                    setUser(user);
                    setError("");
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                setError(errorMessage);
            }).finally(() => setIsLoading(false));
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                const { displayName, email, photoURL, emailVerified } = user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                    emailVerified: emailVerified
                };
                setUser(loggedInUser);
            } else {
                setUser({});
            }
            setIsLoading(false);
        })
    }, []);

    const sendEmailVerificationLink = () => {
        return sendEmailVerification(auth.currentUser);
    }
    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .finally(() => setIsLoading(false));
    }

    return {
        handleGoogleSignIn,
        handleGithubSignIn,
        handleFirebaseEmailSignIn,
        handleFirebaseEmailSignUp,
        error,
        user,
        isLoading,
        logout
    }
}

export default useFirebase;