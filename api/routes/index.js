const express = require('express')
const router = express.Router()
const axios = require('axios')
const {Movie} = require('../models')


const API_KEY = '7c639233f3cff010f01aa2a8c5129344';
const url = 'https://api.themoviedb.org/3';

router.post('/sync', (req, res, next) => {
    axios.get(`${url}/movie/popular?api_key=${API_KEY}`)
        .then((res) => res.data)
        .then((movies) => {
            Movie.bulkCreate(movies)
                .then(() => {
                res.status(201).json({message: 'TODO OK'})
                })
                .catch((error) => {
                    console.error('ERROR: ----->', error)
                    res.status(500).json({
                        error: 'NO SE CREO'})
            })
        })
})

module.exports = router