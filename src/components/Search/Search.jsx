import React from 'react';
import { Content } from '../Content/Content';
import { Navbar } from '../Navbar/Navbar';

export const Search = ({onSearch, searchMovies, onAddFavorite, handleRemove }) => {
    return (
        <div>
            <Navbar onSearch={onSearch} />
            <Content handleRemove={handleRemove} onAddFavorite={onAddFavorite} movies={searchMovies} />
        </div>
    );
};
