import {useAuth} from "../contexts/AuthContext.jsx";
import {useState} from "react";

function LoginForm() {
    const {login} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) =>{
        event.preventDefault()
        await login(username, password);
    }



    return (
        <>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginForm;