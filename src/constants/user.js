import React, {createContext, useContext, useState} from 'react';

const userContext = createContext();
export const userProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const loginUser = (userData) => {
        setCurrentUser(userData);
    }

    const registerUser = (userData) => {
        setCurrentUser(userData);
    }

    const logoutUser = () => {
        setCurrentUser(null);
    }

    return (
        <useContext.Provider value={{currentUser, loginUser, registerUser,logoutUser}}>
                {{children}}
        </useContext.Provider>
    )
}

export {userProvider, userContext}