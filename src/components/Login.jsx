import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleInput = (key, value) => {
        setUser((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleLogin = (evt) => {
        evt.preventDefault()
        if (user.email && user.password) {
            axios
                .post('http://localhost:8080/api/login', user, {withCredentials: true})
                .then((res) => {
                    console.log('LOGIN RESPONSE ------>', res.data);

                    const token = res.data
                    console.log('AUTH TOKEN', token);
                })
                .catch((error) => {
                    console.error('ERROR EN LOGIN.JSX ----->', error);
                });
        }
    }

    return (
        <div className="logInContainer">
            <h2>Log In</h2>
            <form className="logInForm">
                <input type="email" name="email" placeholder="email" value={user.email} onChange={(event) => handleInput('email', event.target.value)} />
                <input type="password" value={user.password} name="password" placeholder='password' onChange={(event) => handleInput('password', event.target.value)} />
                <button onClick={handleLogin} type="submit">LOGIN</button>
            </form>
        </div>
    );
};
