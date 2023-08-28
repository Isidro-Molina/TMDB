import React from 'react';

export const Card = ({ item }) => {
    // console.log(item);
    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="" style={{ width: '256px', height: '256px' }} />
            <div>
                <p>{item.title || item.name}</p>
                <button>VER MAS</button>
            </div>
        </div>
    );
};
