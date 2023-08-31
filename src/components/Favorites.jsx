import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { AuthContext } from '../context/AuthContext';

export const Favorites = () => {
    return (
        <div>
            <Navbar />
            <h2>Favorite Movies</h2>
        </div>
    );
};
