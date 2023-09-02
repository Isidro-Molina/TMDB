import express from 'express';
const router = express.Router();
import { User } from '../models/index.js';
import { generateToken } from '../config/tokens.js';
import { validateUser } from '../middleware/auth.js';


router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/register', (req, res) => {
    const { email, password, name, lastname } = req.body;
    User.create({ email, password, name, lastname }).then((user) => res.status(201).send(user));
});

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({
        where: {
            email,
        },
    }).then((user) => {
        if (!user) return res.send(401).json({ message: 'Failed auth' });

        user.validatePassword(password).then((isValid) => {
            if (!isValid) return res.send(401).json({ message: 'Failed auth' });
            else {
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                };
                const token = generateToken(payload);
                res.cookie('token', token);
                res.send(payload)
            }
        });
    });
});

router.get('/me', validateUser, (req, res, next) => {
    res.send(req.user);
});

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.sendStatus(204).end;
});

export default router;
