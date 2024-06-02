const express = require('express');
const router = express.Router();
const controller = require("../controllers/curso.controllers");

// Ruta para obtener todos los cursos de una materia
router.get('/materias/:id/cursos', controller.obtenerTodosLosCursosDeUnaMateria);

// Ruta para obtener todos los cursos
router.get('/cursos', controller.getAllCursos);

// Ruta para obtener un curso segun id
router.get('/cursos/:id', controller.getCursoById);

// Ruta para crear un curso para una materia
router.post('/materias/:id/curso', controller.crearCursoParaMateria);

// Ruta para eliminar un curso
router.delete('/cursos/:id', controller.eliminarCurso);

// Ruta para modificar los datos de un curso
router.put('/cursos/:id', controller.actualizarCurso);

module.exports = router;