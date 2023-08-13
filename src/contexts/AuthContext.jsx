import React, {createContext, useContext, useState} from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
};

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const register = async (username, password) => {
        try{
            const response =
                await axios
                    .post('http://localhost:8000/api/register/', {
                        username,
                        password,
                    });
            if (response.status === 201){
                console.log('registration successful')
            }
        } catch (error){
            console.log('registration unsuccessful')
        }
    }

    const login = async (username, password) => {
        try {
            const response = await axios
                .post('http://localhost:8000/api/login/', {
                    username,
                    password,
                });
            if (response.status === 200) {
                setUser(response.data.user_id);
                console.log('login successfully')
            }
        } catch (error) {
            console.log(error)
        }
    };

    const logout = async () => {
        try{
            await axios
                .post('http://localhost:8000/api/logout/')
            setUser(null);
            console.log('logged out successfully')
        } catch (error){
            console.error('error when logging out', error)
        }
    }

    const  contextValue = {
        user,
        register,
        login,
        logout,
    };

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;