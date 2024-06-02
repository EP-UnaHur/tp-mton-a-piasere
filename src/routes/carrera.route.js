const express = require('express');
const router = express.Router();
const controller = require('../controllers/carrera.controller');

// Ruta para obtener todas las carreras
router.get('/carreras', controller.getAllCarrers);

// Ruta para obtener una carrera segun id
router.get('/carreras/:id', controller.getCareerById);

// Ruta para crear una carrera
router.post('/carreras', controller.createCareer);

// Ruta para obtener todas las materias de una carrera
router.get('/carreras/:id/materias', controller.obtenerMateriasPorCarrera);

// Ruta para crear una materia en una carrera
router.post('/carreras/:id/materia', controller.crearMateriaEnCarrera);

module.exports = router;