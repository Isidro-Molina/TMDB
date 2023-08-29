import { validateToken } from "./tokens.js";

export function validateUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    const { payload } = validateToken(token);
    req.user = payload;
    if (payload) return next();
}
