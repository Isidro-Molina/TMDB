import React from 'react';

export const CardDetails = ({movie, onClose}) => {
    return (
        <div className='cardDetailsOverlay'>
            <div className='cardDetails'>
            <button onClick={onClose}>X</button>
            <h2>{movie.title || movie.name}</h2>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" style={{ width: '400px', height: '500px' }} />
                <p>{movie.overview}</p>
                <p>RELEASE DATE: {movie.release_date}</p>
                <p>RATING: { parseInt(movie.vote_average) }</p>
            </div>
        </div>
    );
};
