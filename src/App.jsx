import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import { Navbar } from './components/Navbar';
import { Content } from './components/Content';

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
        <Navbar />
        <h1>The Movie Database</h1>
        <Content movies={movies} />
        </div>
    );
};

export default App;
