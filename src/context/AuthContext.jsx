import {createContext, useContext, useState} from "react";

const AuthContext = createContext();
export const AuthProvider = ( {children}) => {
    const[user, setUser] = useState(false);

    const login = (userData) => {
        setUser(true);
        localStorage.setItem("token", userData.data.data.token)
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)