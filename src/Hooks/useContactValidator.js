import { useState } from "react";

function useContactValidator() {
    let [contact, setContact] = useState("");
    let [error, setError] = useState("");
    function handleContactInput(e) {
        const contactRegex = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;
        if (contactRegex.test(e.target.value)) {
            setContact(e.target.value);
            setError("");
        }
        else {
            setError("Invalid contact number");
        }
    }

    return [contact, handleContactInput, error];
}

export default useContactValidator;