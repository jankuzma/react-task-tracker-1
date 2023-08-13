import React, {useState} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";

function RegisterForm() {

    const {register} = useAuth();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegistration = async (event) =>{
        event.preventDefault()
        await register(username, password);
    };


    return (
        <>
            <form onSubmit={handleRegistration}>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type={"submit"}>Register</button>
            </form>
        </>
    )
}

export default RegisterForm;