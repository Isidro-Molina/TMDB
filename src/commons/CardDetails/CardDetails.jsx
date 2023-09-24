import React, { useEffect, useState } from 'react';
import './CardDetails.css';
import axios from 'axios';

export const CardDetails = ({ movie, onClose }) => {
    const cardStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
    };

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
