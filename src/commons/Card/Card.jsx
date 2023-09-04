import React from 'react';
import './Card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faHeart} from '@fortawesome/free-solid-svg-icons'

export const Card = ({ item, onShowMore, onAddFavorite, handleRemove }) => {
    return (
        <div className="movies">
            <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="No image" />
            <div className="cardContent">
                <p>{item.title || item.name}</p>
                <button className="heart" onClick={() => onAddFavorite(item.id)} >
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <br />
                <div>
                <button className="showMore" onClick={onShowMore}>
                    SHOW MORE
                </button>
                <button className='remove' onClick={() => handleRemove(item.id)}>REMOVE</button>
                </div>
            </div>
        </div>
    );
};
