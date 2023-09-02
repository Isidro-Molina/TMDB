import React, { useState } from 'react';
import { Card } from '../../commons/Card/Card';
import { CardDetails } from '../../commons/CardDetails/CardDetails';
import './Content.css'


export const Content = ({ movies, onAddFavorite, handleRemove }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleShowMore = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div className="content">
            {movies.map((item) => (
                <Card key={item.id} item={item} onShowMore={() => handleShowMore(item)} onAddFavorite={onAddFavorite} handleRemove={handleRemove} />
            ))}
            {selectedMovie && <CardDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
        </div>
    );
};
