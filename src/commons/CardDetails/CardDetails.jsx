import React, { useEffect, useState } from 'react';
import './CardDetails.css';
import axios from 'axios';

const API_KEY = '7c639233f3cff010f01aa2a8c5129344';

export const CardDetails = ({ movie, onClose }) => {
    const [genres, setGenres] = useState([]);
    const cardStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
    };

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
            .then((response) => {
                const genres = response.data.genres;
                setGenres(genres);
            })
            .catch((error) => {
                console.error('Error fetching genres:', error);
            });
    }, []);

    return (
        <div className="cardDetailsOverlay">
            <div className="cardDetails" style={cardStyle}>
                <button onClick={onClose}>X</button>

                <div className="titleImg">
                    <h2>{movie.title || movie.name}</h2>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" style={{ width: '400px', height: '500px' }} />
                </div>

                <div className="cardDetailsText">
                    <p>{movie.overview}</p>
                    <p>RELEASE DATE: {movie.release_date}</p>
                    <p>RATING: {parseInt(movie.vote_average)} / 10</p>
                </div>
            </div>
        </div>
    );
};
