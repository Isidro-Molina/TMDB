import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router';
import './App.css';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';

const API_KEY = '7c639233f3cff010f01aa2a8c5129344';
const url = 'https://api.themoviedb.org/3';

const App = () => {
    const [movies, setMovies] = useState([]);
    console.log(movies);
    useEffect(() => {
        axios
            .get(`${url}/trending/movie/week?api_key=${API_KEY}`)
            .then((res) => res.data)
            .then((movie) => setMovies(movie.results));
    }, []);

    return (
        <div>
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home movies={movies} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </div>
    );
};

export default App;
