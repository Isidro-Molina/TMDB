import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Register } from './Register';
import { Login } from './Login';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const handleRegister = () => {
        setShowRegister(!showRegister);
    };

    const handleLog = () => {
        setShowLogin(!showLogin);
    };

    // const handleLogout = () => {
    //     toggleAuth(null);
    // };

    return (
        <div>
            <nav className="navbar">
                <h1>The Movie Database</h1>
                <input type="text" placeholder="Search Movies" />
                {user ? (
                    <div>
                        Welcome {user.name} <button onClick={logout}>LOGOUT</button>
                    </div>
                ) : (
                    <div>
                        <Link onClick={handleLog} to="/login">
                            <span>LOGIN</span>
                        </Link>
                        <br />
                            <p>Not an user?
                        <Link onClick={handleRegister} to="/register">
                            <span>REGISTER</span>
                        </Link>
                        </p>
                    </div>
                )}
            </nav>
            {showLogin && <Login handleLog={handleLog} />}
            {showRegister && <Register handleRegister={showRegister} />}
        </div>
    );
};
