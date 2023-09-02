import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=';
// multi en vez de tv para todo
const API_KEY = '7c639233f3cff010f01aa2a8c5129344';

export const Navbar = ({ onSearch }) => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const { user, isAuthenticated, toggleAuth } = useContext(AuthContext);
    const [searchMovie, setSearchMovie] = useState('');

    const navigate = useNavigate();

    const handleRegister = () => {
        setShowRegister(!showRegister);
    };

    const handleLog = () => {
        setShowLogin(!showLogin);
    };

    const handleLogout = () => {
        axios.post('http://localhost:8080/api/logout', null, { withCredentials: true }).then(() => {
            toggleAuth();
            toast('Goodbye!')
        });
    };

    const handleSearch = () => {
        axios
            .get(`${searchUrl}${API_KEY}&query=${searchMovie}`)
            .then((res) => res.data)
            .then((searchRes) => {
                if (searchRes.results.length === 0) {
                    toast.error('No movies found')
                } else {
                    onSearch(searchRes.results);
                }
            })
            .catch((error) => {
                console.error('ERROR EN LA BUSQUEDA -->', error);
            });
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch();
        navigate(`/search?query=${searchMovie}`);
    };

    return (
        <div>
            <nav className="navbar">
                <Link className="linkH1" to="/">
                    <h1>The Movie Database</h1>
                </Link>

                <form onSubmit={handleSearchSubmit}>
                    <input type="text" placeholder="Search Movies" value={searchMovie} onChange={(e) => setSearchMovie(e.target.value)} />
                    <Link onClick={handleSearch} className="lupaContainer" to={`/search?query=${searchMovie}`}>
                        <FontAwesomeIcon className="lupa" icon={faSearch} />
                    </Link>
                </form>

                <Link className="favorites" to="/favorites/:userId">
                    FAVORITES
                </Link>
                {isAuthenticated ? (
                    <div className="navbarLogout">
                        <p>Welcome {user.name}!</p>
                        <button onClick={handleLogout}>LOGOUT</button>
                    </div>
                ) : (
                    <div className="optionContainer">
                        <Link className="navbarLogin" onClick={handleLog} to="/login">
                            <span>LOGIN</span>
                        </Link>
                        <br />
                        <p className="not">
                            Not an user?
                            <Link className="navbarRegister" onClick={handleRegister} to="/register">
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
