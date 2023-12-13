import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const LoginOrRegister = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    return(
        <UserContext.Provider value={{ user, setUser, LoginOrRegister, logout}}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context){
        throw new Error(`useUser must be used within a UserProvider`);
    }
    return context
}