import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Content } from './Content';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const API_KEY = '7c639233f3cff010f01aa2a8c5129344';
const url = 'https://api.themoviedb.org/3';

export const Favorites = () => {
    const { user } = useContext(AuthContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        if (user && user.id) {
            axios
                .get(`http://localhost:8080/api/favorites/${user.id}`)
                .then((res) => {
                    console.log('PELIS FAVORITAS -->', res.data);
                    setFavoriteMovies(res.data);
                })
                .catch((error) => {
                    console.error('ERROR EN EL GET A FAVORITES ---->', error);
                });
        }
    }, [user]);

    useEffect(() => {
        if (favoriteMovies && favoriteMovies.length > 0) {
            const moviePromises = favoriteMovies.map((favorite) => {
                if (favorite.movieId) {
                    return axios.get(`${url}/movie/${favorite.movieId}?api_key=${API_KEY}`);
                } else {
                    console.log('no hay peli');
                    return Promise.reject();
                }
            });

            Promise.all(moviePromises)
                .then((movieRes) => {
                    const movie = movieRes.map((res) => res.data);
                    setFavoriteMovies(movie);
                })
                .catch((error) => {
                    console.error('ERROR AL TRAER MOVIES --->', error);
                });
        }
    }, [favoriteMovies]);

    return (
        <div>
            <Navbar />
            <h2>Favorite Movies</h2>
            <Content movies={favoriteMovies} />
        </div>
    );
};
