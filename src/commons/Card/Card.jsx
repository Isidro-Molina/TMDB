import React from 'react';
import './Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const Card = ({ item, onShowMore, toggleFavorite, userFavorites }) => {
    const isFavorite = Array.isArray(userFavorites) && userFavorites.some((favorite) => favorite.movieId === item.id);

    return (
        <div className="movies">
            <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="No image" />
            <div className="cardContent">
                <p>{item.title || item.name}</p>
                <button className={`heart ${isFavorite ? 'red' : ''}`} onClick={() => toggleFavorite(item.id)}>
                    <FontAwesomeIcon icon={faHeart} className="favorite-icon" />
                </button>
                <br />
                <div>
                    <button className="showMore" onClick={onShowMore}>
                        SHOW MORE
                    </button>
                </div>
            </div>
        </div>
    );
};
