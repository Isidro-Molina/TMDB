import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Register = ({ handleRegister }) => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
        lastname: '',
    });

    const handleInput = (key, value) => {
        setUser((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const navigate = useNavigate()

    const handlerSubmit = (evt) => {
        evt.preventDefault();
        if (user.email && user.password && user.name && user.lastname) {
            axios
                .post('http://localhost:8080/api/register', user)
                .then((res) => {
                    console.log('RESPONSE ------>', res.data);
                    navigate('/login')
                })
                .catch((error) => {
                    console.error('ERROR EN SIGNUP.JSX ----->', error);
                });
        }
    };

    return (
        <div className="signUpContainer">
            <h2>Sign Up</h2>
            <Link to="/">
                <span className="close_btn" onClick={handleRegister}>
                    X
                </span>
            </Link>
            <form className="signUpForm">
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={(event) => handleInput('email', event.target.value)} />
                <input type="password" name="password" placeholder="Password" value={user.password} onChange={(event) => handleInput('password', event.target.value)} />
                <input type="text" name="name" placeholder="Name" value={user.name} onChange={(event) => handleInput('name', event.target.value)} />
                <input type="text" name="lastname" placeholder="Lastname" value={user.lastname} onChange={(event) => handleInput('lastname', event.target.value)} />
            </form>
            <button onClick={handlerSubmit} type="submit">
                SUBMIT
            </button>
        </div>
    );
};
