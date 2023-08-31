import express from 'express';
const router = express.Router();
import { User, Favorite } from '../models/index.js';

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
            if (error.message === 'Favorite already exists') {
                res.status(400).json({ error: 'Favorite already exists' });
            } else {
                res.status(500).json('ERROR DE CREAR FAVORITO --->', { error: error.message });
            }
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
            res.status(200).json(favorites);
        })
        .catch((error) => {
            res.status(500).json('ERROR DE FIND ALL --->', { error: error.message });
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
            res.status(200).json({ deleted });
        })
        .catch((error) => {
            res.status(500).json('ERROR DE DELETE ---->', { error: error.message });
        });
});

export default router;
