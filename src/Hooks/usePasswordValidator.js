import { useState } from "react";

function usePasswordValidator() {
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    function handlePasswordInput(e) {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/;
        if (passwordRegex.test(e.target.value)) {
            setPassword(e.target.value);
            setError("");
        }
        else {
            setError("Password must have at least one uppercase, one lowercase, one digit and within 8 to 20 chatacters");
        }
    }

    return [password, setPassword, handlePasswordInput, error];
}

export default usePasswordValidator;