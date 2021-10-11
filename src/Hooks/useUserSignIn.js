import { useState } from 'react';

let useUserSignIn = () => {
    const [user, setUser] = useState({})
    return [user, setUser];
}

export default useUserSignIn;