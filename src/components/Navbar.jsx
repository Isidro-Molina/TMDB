import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Signup } from './Signup';
import { Login } from './Login';

export const Navbar = () => {
    const [showSignup, setShow] = useState(false)
    const [showLogin, setLog] = useState(false)

    const handleRegister = () => {
        showSignup ? setShow(false) : setShow(true)
    }

    const handleLog = () => {
        showLogin ? setLog(false) : setLog(true)
    }

    return (
        <div>
            <nav className="navbar">
                <h1>The Movie Database</h1>
                <input type="text" placeholder="Search Movies" />
                <Link onClick={handleLog} to="/login">
                    <span>LOGIN</span>
                </Link>
                <div>
                    Not a user?
                    <Link onClick={handleRegister} to="/signup">
                        <span>REGISTER</span>
                    </Link>
                </div>
            </nav>
            {(showLogin && (
                <div className="signUp">
                    <div className="logInCard">
                        <Link to="/">
                            <span className="close_btn" onClick={handleLog}>
                                X
                            </span>
                        </Link>
                        <Login />
                    </div>
                </div>
            )) ||
                (showSignup && (
                    <div className="signUp">
                        <div className="signUpCard">
                            <Link to="/">
                                <span className="close_btn" onClick={handleRegister}>
                                    X
                                </span>
                            </Link>
                            <Signup />
                        </div>
                    </div>
                ))}
        </div>
    );
};
