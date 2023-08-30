import React, { useState } from 'react';
import { Card } from '../commons/Card';
import { CardDetails } from '../commons/CardDetails';

export const Content = ({ movies }) => {

    const [selectedMovie, setSelectedMovie] = useState(null)

    const handleShowMore = (movie) => {
        setSelectedMovie(movie)
    }

    return <div className='content'>
        {movies.map((item) => (
                <Card key={item.id} item={item} onShowMore={()=>handleShowMore(item)} />
        ))}
        {selectedMovie && <CardDetails movie={selectedMovie} onClose={()=>setSelectedMovie(null)} />}
    </div>;
};
