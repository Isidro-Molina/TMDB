import React from 'react';
import { Navbar } from '../Navbar/Navbar';
import { Content } from '../Content/Content';

export const Home = ({ movies, onAddFavorite, handleRemove, onSearch, searchMovies }) => {
    return (
        <div>
            <Navbar onSearch={onSearch} searchMovies={searchMovies} />
            <Content handleRemove={handleRemove} onAddFavorite={onAddFavorite} movies={movies} />
        </div>
    );
};

