import jwt from 'jsonwebtoken';

const SECRET = 'milanesa';

export function generateToken(payload) {
    const token = jwt.sign({ payload }, SECRET, {
        expiresIn: '2d',
    });
    return token;
}

export function validateToken(token) {
    return jwt.verify(token, SECRET);
}
