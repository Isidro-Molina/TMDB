import React from 'react';
import { Content } from '../Content/Content';
import { Navbar } from '../Navbar/Navbar';

export const Search = ({onSearch, searchMovies, toggleFavorite, userFavorites }) => {
    return (
        <div>
            <Navbar onSearch={onSearch} />
            <Content toggleFavorite={toggleFavorite} movies={searchMovies} userFavorites={userFavorites} />
        </div>
    );
};
