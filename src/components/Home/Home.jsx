import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Content } from '../Content/Content';

export const Home = ({ movies, toggleFavorite, onSearch, searchMovies, userFavorites }) => {
    return (
        <div>
            <Navbar onSearch={onSearch} searchMovies={searchMovies} />
            <Content toggleFavorite={toggleFavorite} movies={movies} userFavorites={userFavorites} />
        </div>
    );
};

