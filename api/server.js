// Configuración del server
const express = require('express')
const app = express()
const db = require('./config/db')
const models = require('./models')
const routes = require('./routes')


app.use(express.json())

app.use('/api', routes)


db.sync({ force: false }).then(() => {
    app.listen(8080, () => {
        console.log('Servidor corriendo en el puerto 8080');
    })
})