import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Content } from '../Content/Content';

export const Home = ({ movies, toggleFavorite, onSearch, searchMovies, userFavorites, handleLogout }) => {
    return (
        <div>
            <Navbar onSearch={onSearch} searchMovies={searchMovies} userFavorites={userFavorites} handleLogout={handleLogout} />
            <Content toggleFavorite={toggleFavorite} movies={movies} userFavorites={userFavorites} />
        </div>
    );
};

