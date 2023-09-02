import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const {reloading} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (evt) => {
        evt.preventDefault();
        if (user.email && user.password) {
            axios
                .post('http://localhost:8080/api/login', user, { withCredentials: true })
                .then(() => {
                    toast.success('You are now logged in!', {position: 'top-right'})
                    reloading()
                    navigate('/');
                })
                .catch((error) => {
                    toast.error('Login failed.')
                    console.error('ERROR EN LOGIN.JSX ----->', error);
                });
        }
    };

    return (
        <div className="logInContainer">
            <h2>Log In</h2>
            <Link to="/">
                <span onClick={handleLog}>
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
