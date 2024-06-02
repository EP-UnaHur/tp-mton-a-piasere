const express = require('express');
const router = express.Router();
const controller = require("../controllers/curso.controllers");

// Ruta para obtener todos los cursos
router.get('/cursos', controller.getAllCursos);

// Ruta para obtener un curso segun id
router.get('/cursos/:id', controller.getCursoById);

// Ruta para eliminar un curso
router.delete('/cursos/:id', controller.eliminarCurso);

// Ruta para modificar los datos de un curso
router.put('/cursos/:id', controller.actualizarCurso);

//Crea la asociacion de un curso con 1 o N profesores
router.post('/cursos/:id/profesores', controller.crearAsociacionCursoProfesor)

//Obtener todos los profesores de un Curso
router.get('/cursos/:id/profesores', controller.obtenerProfesoresDeCurso);

module.exports = router;