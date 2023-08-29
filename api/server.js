// Configuración del server
import express from 'express';
import cors from 'cors'
const app = express();
import db from './config/db.js';
import users from './routes/users-routes.js'
import { User } from './models/index.js';
import cookieParser from 'cookie-parser';

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))

app.use('/api', users);

db.sync({ force: false }).then(() => {
    app.listen(8080, () => {
        console.log('Servidor corriendo en el puerto 8080');
    });
});
