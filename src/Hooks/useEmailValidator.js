import { useState } from "react";

function useEmailValidator() {
    let [email, setEmail] = useState("");
    let [error, setError] = useState("");
    function handleEmailInput(e) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegex.test(e.target.value.toLowerCase())) {
            setEmail(e.target.value);
            setError("");
        }
        else {
            setError("Invalid email address");
        }
    }

    return [email, handleEmailInput, error];
}

export default useEmailValidator;