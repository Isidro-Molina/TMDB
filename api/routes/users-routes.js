import express from 'express';
import { User } from '../models/index.js';
const router = express.Router()
import jwt from 'jsonwebtoken';
import { generateToken } from '../config/tokens.js'
import { validateUser } from '../config/auth.js';
import cookieParser from 'cookie-parser';

// USUARIOS, REGISTROS

router.get('/', (req, res) => {
    res.sendStatus(200)
})

router.post('/signup', (req, res) => {
    const { email, password, name, lastname } = req.body
    User.create({email, password, name, lastname}).then((user)=>res.status(201).send(user))
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({
        where: {
            email,
        },
    }).then((user) => {
        if (!user) return res.send(401).json({message: 'Failed auth'});

        user.validatePassword(password).then((isValid) => {
            if (!isValid) return res.send(401).json({ message: 'Failed auth' });
            else {
                const payload = {
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                };
                const token = generateToken(payload);
                res.cookie('token', token);
                console.log('LA COOKIE ------> ', req.cookies);
                res.send(payload);
            }
        });
    });
});

export default router