const express = require('express');
const router = express.Router();
const controller = require('../controllers/materia.controller.js');


// Ruta para obtener todas las materias
router.get('/materias', controller.getAllMaterias);

// Ruta para obtener una materia segun id
router.get('/materias/:id', controller.getMateriaById);

// Ruta para eliminar una materia
router.delete('/materias/:id', controller.eliminarMateria);

// Ruta para obtener todos los cursos de una materia
router.get('/materias/:id/cursos', controller.obtenerTodosLosCursosDeUnaMateria);

// Ruta para crear un curso para una materia
router.post('/materias/:id/curso', controller.crearCursoParaMateria);

module.exports = router;