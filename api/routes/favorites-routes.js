import express from 'express';
const router = express.Router();
import { Favorite } from '../models/index.js';

router.post('/favorites/add', (req, res) => {
    const { userId, movieId } = req.body;

    Favorite.create({
        userId,
        movieId,
    })
        .then((favorite) => {
            res.status(201).json({ favorite });
        })
        .catch((error) => {
            res.status(400).json({ error: 'Favorite already exists' });
        });
});

router.get('/favorites/:userId', (req, res) => {
    const { userId } = req.params;

    Favorite.findAll({
        where: {
            userId,
        },
    })
        .then((favorites) => {
            // hacemos sin {} para que la respuesta sea [fav1, fav2, ...] sino seria {fav: [fav1, fav2, ...]}
            res.status(200).json(favorites);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

router.delete('/favorites/:userId/:movieId', (req, res) => {
    const { userId, movieId } = req.params;

    Favorite.destroy({
        where: {
            userId,
            movieId,
        },
    })
        .then((deleted) => {
            // indica cuanto fue borrado, 1
            res.status(200).json({ deleted });
        })
        .catch((error) => {
            res.status(500).json('ERROR DE DELETE ---->', { error: error.message });
        });
});

export default router;
