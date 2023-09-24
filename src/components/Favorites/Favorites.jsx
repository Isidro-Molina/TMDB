import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Content } from '../Content/Content';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './Favorites.css'

const API_KEY = import.meta.env.VITE_APP_APIKEY;
const url = 'https://api.themoviedb.org/3';

export const Favorites = ({onSearch, userFavorites, toggleFavorite }) => {
    const { user } = useContext(AuthContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        if (user && user.id) {
            axios
                .get(`http://localhost:8080/api/favorites/${user.id}`)
                .then((res) => {
                    setFavoriteMovies(res.data);
                })
                .catch((error) => {
                    console.error('ERROR EN EL GET A FAVORITES ---->', error);
                });
        }
    }, [user]);

    useEffect(() => {
        // chequeamos que haya favoriteMovies
        if (favoriteMovies && favoriteMovies.length > 0) {
            // crea un array de promesas, cada una corresponde a la data que queremos traear de la API
            const moviePromises = favoriteMovies.map((favorite) => {
                // favorite corresponde a cada objeto guardado en favoriteMovies. Este objeto tiene una key movieId.
                if (favorite.movieId) {
                    return axios.get(`${url}/movie/${favorite.movieId}?api_key=${API_KEY}`);
                } else {
                    // si no existe la rechazamos
                    return Promise.reject();
                }
            });

            // Fetcheamos toda la data de todas las promesas
            Promise.all(moviePromises)
                // movieRes contiene todos los datos de las peliculas
                .then((movieRes) => {
                    const movie = movieRes.map((res) => res.data);
                    setFavoriteMovies(movie);
                })
                .catch((error) => {
                    console.error('ERROR AL TRAER MOVIES --->', error);
                });
        }

        // se ejecuta cuando favoriteMovies cambie
    }, [favoriteMovies]);

    return (
        <div>
            <Navbar onSearch={onSearch} />
            <h2>Favorite Movies</h2>
            {favoriteMovies.length === 0 ? <h3>Add something!</h3> : <Content toggleFavorite={toggleFavorite} movies={favoriteMovies} userFavorites={userFavorites} />}
        </div>
    );
};
