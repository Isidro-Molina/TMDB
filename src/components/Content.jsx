import React from 'react';
import { Card } from '../commons/Card';

export const Content = ({ movies }) => {
    return <div className='content'>
        {movies.map((item) => (
                <Card key={item.id} item={item} />
        ))}
    </div>;
};
