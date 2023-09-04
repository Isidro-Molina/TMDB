import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { AuthContext } from './context/AuthContext';
import { Favorites } from './components/Favorites/Favorites';
import { Search } from './components/Search/Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = '7c639233f3cff010f01aa2a8c5129344';
const url = 'https://api.themoviedb.org/3';

const App = () => {
    const [movies, setMovies] = useState([]);
    const { user, reloading} = useContext(AuthContext);
    const [searchMovies, setSearchMovie] = useState([]);

    useEffect(() => {
        axios
            .get(`${url}/trending/movie/week?api_key=${API_KEY}`)
            .then((res) => res.data)
            .then((movie) => setMovies(movie.results));
    }, []);

    const onAddFavorite = (movieId) => {
        if (user === null) {
            toast.warning('You need to be logged in');
        }
        axios
            .post('http://localhost:8080/api/favorites/add', { userId: user.id, movieId })
            .then(() => {
                toast.success('Movie added successfully!');
            })
            .catch((error) => {
                toast.error('This movie is already in your favorites!');
                console.error('ERROR AGREGANDO FAVORITO ----> ', error.message);
            });
    };

    const handleRemove = (movieId) => {
        if (user === null) {
            toast.warning('You need to be logged in');
        }
        axios
            .delete(`http://localhost:8080/api/favorites/${user.id}/${movieId}`)
            .then(() => {
                toast.info('Successfully removed from favorites!');
            })
            .catch((error) => {
                console.error('ERROR AL REMOVER -->', error);
            });
        reloading();
    };

    const onSearch = (searchRes) => {
        setSearchMovie(searchRes);
    };

    return (
        <div>
            <ToastContainer position="top-center" autoClose={2000} pauseOnFocusLoss={false} pauseOnHover={false} />
            <Routes>
                <Route path="/" element={<Home onAddFavorite={onAddFavorite} handleRemove={handleRemove} movies={movies} onSearch={onSearch} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/favorites/:userId" element={<Favorites onSearch={onSearch} handleRemove={handleRemove} />} />
                <Route path="/search" element={<Search onAddFavorite={onAddFavorite} onSearch={onSearch} searchMovies={searchMovies} handleRemove={handleRemove} />} />
            </Routes>
        </div>
    );
};

export default App;
