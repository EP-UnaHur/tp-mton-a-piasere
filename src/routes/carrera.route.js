const express = require('express');
const router = express.Router();
const controller = require('../controllers/carrera.controller');
const middleware = require('../middlewares/existeConId.middleware.js')
const {Carrera} = require('../db/models');
const {carreraSchema} = require('../schemas/carrera.schema.js');
const {materiaSchema} = require('../schemas/materia.schema.js')

// Ruta para obtener todas las carreras
router.get('/carreras', controller.getAllCarrers);

// Ruta para obtener una carrera segun id
router.get('/carreras/:id',middleware.existsById(Carrera), controller.getCareerById);

// Ruta para crear una carrera
router.post('/carreras', middleware.validaSchema(carreraSchema),controller.createCareer);

// Ruta para obtener todas las materias de una carrera
router.get('/carreras/:id/materias',middleware.existsById(Carrera), controller.obtenerMateriasPorCarrera);

// Ruta para crear una materia en una carrera
router.post('/carreras/:id/materia',middleware.existsById(Carrera),middleware.validaSchema(materiaSchema),controller.crearMateriaEnCarrera);

module.exports = router;