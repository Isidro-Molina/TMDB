import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import { Navbar } from './components/Navbar';
import { Content } from './components/Content';
import { BrowserRouter } from 'react-router-dom';

const API_KEY = '7c639233f3cff010f01aa2a8c5129344';
const url = 'https://api.themoviedb.org/3';

const App = () => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios.get(`${url}/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => res.data)
    .then((movie)=>setMovies(movie.results))
    
  }, [])

    return (
        <div>
            <BrowserRouter>
                <Navbar />
                <Content movies={movies} />
            </BrowserRouter>
        </div>
    );
};

export default App;
