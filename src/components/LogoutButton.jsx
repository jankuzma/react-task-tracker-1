import {useAuth} from "../contexts/AuthContext.jsx";

function LogoutButton() {
    const {logout} = useAuth()

    const handleLogout = async () =>{
        await logout()
    }

    return (
        <>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default LogoutButton;