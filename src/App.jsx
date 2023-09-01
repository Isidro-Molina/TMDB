import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router';
import './App.css';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AuthContext } from './context/AuthContext';
import { Favorites } from './components/Favorites';

const API_KEY = '7c639233f3cff010f01aa2a8c5129344';
const url = 'https://api.themoviedb.org/3';

const App = () => {
    const [movies, setMovies] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios
            .get(`${url}/trending/movie/week?api_key=${API_KEY}`)
            .then((res) => res.data)
            .then((movie) => setMovies(movie.results));
    }, []);

    const onAddFavorite = (movieId) => {
        axios
            .post('http://localhost:8080/api/favorites/add', { userId: user.id, movieId })
            .then((res) => {
                console.log('SE AGREGO A FAVORITOS --->', res.data);
            })
            .catch((error) => {
                if (error.message === 'Favorite already exists') {
                    console.error('Favorite already exists -->', error);
                } else {
                    console.error('ERROR AGREGANDO FAVORITO ----> ', error);
                }
            });
    };

        const handleRemove = (movieId) => {
            axios
                .delete(`http://localhost:8080/api/favorites/${user.id}/${movieId}`)
                .then((res) => {
                    console.log('PELI FAVORITA REMOVIDA -->', res.data);
                    setFavoriteMovies((prev) => prev.filter((favorite) => favorite.movieId !== movieId));
                })
                .catch((error) => {
                    console.error('ERROR AL REMOVER -->', error);
                });
        };

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home onAddFavorite={onAddFavorite} handleRemove={handleRemove} movies={movies} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/favorites/:userId" element={<Favorites />} />
            </Routes>
        </div>
    );
};

export default App;
