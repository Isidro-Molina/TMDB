import React from 'react';
import { Navbar } from './Navbar';
import { Content } from './Content';

export const Home = ({ movies, onAddFavorite }) => {
    return (
        <div>
            <Navbar />
            <Content onAddFavorite={onAddFavorite} movies={movies} />
        </div>
    );
};
