const express = require('express');
//const data = require('../data/data.json')
const db = require('./db/models')

const _ = require('lodash');
const app = express();
app.use(express.json())
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

app.listen(port, async () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
    try {
        //Esto verifica si me pude conectar bien a la base de datos
        await db.sequelize.authenticate()

        /* const carrera = await db.Carrera.create({
            nombre: 'Informatica',
            grado: '1',
            universidad: 'UNAHUR'
        });*/
    } 
    catch(err) {
        console.log(err)
    }
});