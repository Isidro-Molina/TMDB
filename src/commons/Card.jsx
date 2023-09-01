import React from 'react';

export const Card = ({ item, onShowMore, onAddFavorite, handleRemove }) => {
    return (
        <div className="movies">
            <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="" style={{ width: '256px', height: '256px' }} />
            <div className="cardContent">
                <p>{item.title || item.name}</p>
                <button className="showMore" onClick={onShowMore}>
                    VER MAS
                </button>
                <p className="heart" onClick={() => onAddFavorite(item.id)}>
                    ♡
                </p>
                <button onClick={()=>handleRemove(item.id)}>REMOVE</button>
            </div>
        </div>
    );
};
