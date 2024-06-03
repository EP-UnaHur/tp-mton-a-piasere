const express = require('express');
const router = express.Router();
const controller = require('../controllers/profesor.controller.js');
const middleware = require('../middlewares/existeConId.middleware.js')
const {Profesor} = require('../db/models')
const profesorSchema = require('../schemas/profesor.schema.js')
router.get('/profesores', controller.getAllProfesores);

router.get('/profesores/:id',middleware.existsById(Profesor),controller.getProfesorById);

router.post('/profesores', middleware.validaSchema(profesorSchema),controller.createProfesor);

router.put('/profesores/:id', middleware.existsById(Profesor),controller.editarProfesor);

router.delete('/profesores/:id', middleware.existsById(Profesor),controller.deleteProfesor);

router.get('/profesores/:id/cursos', middleware.existsById(Profesor),controller.obtenerCursosDeProfesor);

module.exports = router;