import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const authContextDefaultValues = {
    id: 0,
    user: null,
    isAuthenticated: false,
    toggleAuth: () => null,
    reloading: ()=>{}
};

export const AuthContext = createContext(authContextDefaultValues);

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(authContextDefaultValues);
    const [reload, setReload] = useState(false)

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/me', { withCredentials: true })
            .then((res) => toggleAuth(res.data))
        .catch(()=>console.log('Necesitas Loguearte'))
    }, [reload]);

    const toggleAuth = (user) => {
        if (user) {
            setIsLoggedIn({
                user: {
                    id: user.id,
                    ...user
                },
                isAuthenticated: true,
            });
            // console.log(user);
        } else {
            setIsLoggedIn({
                user: null,
                isAuthenticated: false,
            });
        }
    };

    const reloading = () => {
        setReload(!reload)
    }

    return <AuthContext.Provider value={{ ...isLoggedIn, toggleAuth, reloading }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
