const express = require('express');
const db = require('./db/models')
const carreraRoute = require('./routes/carrera.route')
const materiaRoute = require('./routes/materia.route')
const cursoRoute = require('./routes/curso.route')
const profesorRoute = require('./routes/profesor.route')

const _ = require('lodash');
const app = express();

const port = 3000;

app.use(express.json())
app.use(carreraRoute)
app.use(materiaRoute)
app.use(cursoRoute)
app.use(profesorRoute)

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
        await db.sequelize.sync({force:true});
    } 
    catch(err) {
        console.log(err)
    }
});