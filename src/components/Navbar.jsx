import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Register } from './Register';
import { Login } from './Login';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export const Navbar = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const { user, isAuthenticated, toggleAuth } = useContext(AuthContext);

    const handleRegister = () => {
        setShowRegister(!showRegister);
    };

    const handleLog = () => {
        setShowLogin(!showLogin);
    };

    const handleLogout = () => {
        axios.post('http://localhost:8080/api/logout',null, { withCredentials: true }).then(() => toggleAuth())
    };

    return (
        <div>
            <nav className="navbar">
                <Link className='linkH1' to='/'>
                <h1>The Movie Database</h1>
                </Link>
                <input type="text" placeholder="Search Movies" />
                <Link to='/favorites/:userId'>FAVORITES</Link>
                {isAuthenticated ? (
                    <div>
                        <p>Welcome {user.name}</p>
                        <button onClick={handleLogout}>LOGOUT</button>
                    </div>
                ) : (
                    <div>
                        <Link onClick={handleLog} to="/login">
                            <span>LOGIN</span>
                        </Link>
                        <br />
                        <p>
                            Not an user?
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
