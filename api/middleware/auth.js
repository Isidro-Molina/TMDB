import { validateToken } from '../config/tokens.js';

export function validateUser(req, res, next) {
    console.log('LLAMARON AL MIDDLEWARE PARA EL AUTH VALIDATEUSER');
    const token = req.cookies.token;
    if (!token) {
        console.log('NO HAY TOKEN EN LAS COOKIES');
        return res.sendStatus(401);
    }

    const { payload } = validateToken(token);
    console.log('TOKEN PAYLOAD', payload);
    req.user = payload;
    if (payload) {
        console.log('USUARIO AUTH',  payload);
        return next();
    } else {
        console.log('TOKEN INVALIDO');
        return res.sendStatus(401)
    }
}
