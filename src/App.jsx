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

const API_KEY = import.meta.env.VITE_APP_APIKEY;
const url = 'https://api.themoviedb.org/3';

const App = () => {
    const [movies, setMovies] = useState([]);
    const { user, reloading } = useContext(AuthContext);
    const [searchMovies, setSearchMovie] = useState([]);
    const [userFavorites, setUserFavorites] = useState([]);

    useEffect(() => {
        axios
            .get(`${url}/trending/movie/week?api_key=${API_KEY}`)
            .then((res) => res.data)
            .then((movie) => setMovies(movie.results));
    }, []);

    useEffect(() => {
        if (user) {
            axios
                .get(`http://localhost:8080/api/favorites/${user.id}`)
                .then((res) => setUserFavorites(res.data))
                .catch((error) => console.error('Error al traer favoritos  ->', error));
        }
    }, [user]);

    const toggleFavorite = (movieId) => {
        if (user === null) {
            toast.warning('You need to be logged in');
            return;
        }

        const isFavorite = Array.isArray(userFavorites) && userFavorites.some((favorite) => favorite.movieId === movieId);

        if (isFavorite) {
            axios
                .delete(`http://localhost:8080/api/favorites/${user.id}/${movieId}`)
                .then(() => {
                    toast.info('Successfully removed from favorites!');
                    setUserFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.movieId !== movieId));
                })
                .catch((error) => {
                    console.error('ERROR AL REMOVER -->', error);
                });
        } else {
            axios
                .post('http://localhost:8080/api/favorites/add', { userId: user.id, movieId })
                .then(() => {
                    toast.success('Movie added successfully!');
                    setUserFavorites((prevFavorites) => [...prevFavorites, { movieId }]);
                })
                .catch((error) => {
                    toast.error('This movie is already in your favorites!');
                    console.error('ERROR AGREGANDO FAVORITO ----> ', error.message);
                });
        }
        reloading();
    };

    const onSearch = (searchRes) => {
        setSearchMovie(searchRes);
    };

    return (
        <div>
            <ToastContainer position="top-center" autoClose={2000} pauseOnFocusLoss={false} pauseOnHover={false} />
            <Routes>
                <Route path="/" element={<Home toggleFavorite={toggleFavorite} movies={movies} onSearch={onSearch} userFavorites={userFavorites || []} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/favorites/:userId" element={<Favorites onSearch={onSearch} userFavorites={userFavorites} toggleFavorite={toggleFavorite} />} />
                <Route path="/search" element={<Search toggleFavorite={toggleFavorite} onSearch={onSearch} searchMovies={searchMovies} userFavorites={userFavorites} />} />
            </Routes>
        </div>
    );
};

export default App;
