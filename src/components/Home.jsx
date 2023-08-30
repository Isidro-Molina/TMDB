import React from 'react';
import { Navbar } from './Navbar';
import { Content } from './Content';

export const Home = ({ movies }) => {

    return (
        <div>
            <Navbar />
            <Content movies={movies} />
        </div>
    );
};