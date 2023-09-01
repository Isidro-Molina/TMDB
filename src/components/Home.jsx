import React from 'react';
import { Navbar } from './Navbar';
import { Content } from './Content';

export const Home = ({ movies, onAddFavorite, handleRemove }) => {
    return (
        <div>
            <Navbar />
            <Content handleRemove={handleRemove} onAddFavorite={onAddFavorite} movies={movies} />
        </div>
    );
};
