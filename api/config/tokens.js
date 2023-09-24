import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const SECRET = process.env.SECRET;

export function generateToken(payload) {
    const token = jwt.sign({ payload }, SECRET, {
        expiresIn: '2d',
    });
    return token
}

export function validateToken(token) {
    return jwt.verify(token, SECRET);
}
