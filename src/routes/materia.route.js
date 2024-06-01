const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Ruta para obtener todas las materias
router.get('/carreras/:carreraId/materias', controller.getAllMaterias);

// Ruta para obtener todas las materias de una carrera
router.get('/carreras/:carreraId/materias', controller.obtenerMateriasPorCarrera);

// Ruta para obtener una materia segun id
router.delete('/materias/:id', controller.getMateriaById);

// Ruta para crear una materia en una carrera
router.post('/carreras/:carreraId/materias', controller.crearMateriaEnCarrera);

// Ruta para eliminar una materia
router.delete('/materias/:id', controller.eliminarMateria);

module.exports = router;