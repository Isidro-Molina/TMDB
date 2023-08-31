// Configuración del server
import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import users from './routes/users-routes.js';
import favorites from './routes/favorites-routes.js';
import { User } from './models/index.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

app.use('/api', users);
app.use('/api', favorites);

db.sync({ force: false }).then(() => {
    app.listen(8080, () => {
        console.log('Servidor corriendo en el puerto 8080');
    });
});
