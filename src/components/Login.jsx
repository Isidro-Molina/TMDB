import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Login = ({ handleLog }) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleInput = (key, value) => {
        setUser((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const {toggleAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (evt) => {
        evt.preventDefault();
        if (user.email && user.password) {
            axios
                .post('http://localhost:8080/api/login', user, { withCredentials: true })
                .then((res) => {
                    console.log('RES.DATA ------>', res.data);
                    const { email, name, lastname } = res.data;

                    toggleAuth({ email, name, lastname })
                    const cookies = document.cookie.split('; ')
                    const tokenCookie = cookies.find((cookie) => cookie.startsWith('token='))
                    const token = tokenCookie.split('=')[1]
                    console.log('AUTH TOKEN', token);

                    navigate('/');
                })
                .catch((error) => {
                    console.error('ERROR EN LOGIN.JSX ----->', error);
                });
        }
    };

    return (
        <div className="logInContainer">
            <h2>Log In</h2>
            <Link to="/">
                <span className="close_btn" onClick={handleLog}>
                    X
                </span>
            </Link>
            <form className="logInForm">
                <input type="email" name="email" placeholder="email" value={user.email} onChange={(event) => handleInput('email', event.target.value)} />
                <input type="password" value={user.password} name="password" placeholder="password" onChange={(event) => handleInput('password', event.target.value)} />
                <button onClick={handleLogin} type="submit">
                    LOGIN
                </button>
            </form>
        </div>
    );
};
