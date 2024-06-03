const express = require('express');
const router = express.Router();
const controller = require('../controllers/materia.controller.js');
const middleware = require('../middlewares/existeConId.middleware.js')
const {Materia} = require('../db/models');
const {cursoSchema} = require('../schemas/curso.schema.js');
const {materiaSchema} = require('../schemas/materia.schema.js')

// Ruta para obtener todas las materias
router.get('/materias', controller.getAllMaterias);

// Ruta para obtener una materia segun id
router.get('/materias/:id', middleware.existsById(Materia),controller.getMateriaById);

// Ruta para eliminar una materia
router.delete('/materias/:id', middleware.existsById(Materia),controller.eliminarMateria);

// Ruta para obtener todos los cursos de una materia
router.get('/materias/:id/cursos', middleware.existsById(Materia),controller.obtenerTodosLosCursosDeUnaMateria);

// Ruta para crear un curso para una materia
router.post('/materias/:id/curso', middleware.existsById(Materia),middleware.validaSchema(cursoSchema),controller.crearCursoParaMateria);

module.exports = router;