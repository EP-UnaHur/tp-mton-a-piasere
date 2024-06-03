const {Profesor, Curso} = require('../db/models');
const controller = {};

//Obtener todos los profesores
const getAllProfesores = async (req, res) => {
    res.status(200).json(await Profesor.findAll({}))
}
controller.getAllProfesores = getAllProfesores

//Encontrar un profesor por id
const getProfesorById = async(req, res) => {
    const id = req.params.id
    const profesor = await Profesor.findByPk(id)
    res.status(200).json(profesor)
}
controller.getProfesorById = getProfesorById;

//Crear un profesor
const createProfesor = async (req, res) => {
    const profesor = await Profesor.create(req.body)
    res.status(201).json(profesor)
}
controller.createProfesor = createProfesor

//Editar info de profesor
const editarProfesor = async (req,res) => {
    const id = req.params.id
    const {nombre, fechaNacimiento, legajo, activo} = req.body
    const profesor = await Profesor.findByPk(id);
    profesor.nombre = profesor.nombre !== undefined ? nombre : profesor.nombre;
    profesor.fechaNacimiento = profesor.fechaNacimiento !== undefined ? fechaNacimiento : profesor.fechaNacimiento;
    profesor.legajo = profesor.legajo !== undefined ? legajo : profesor.legajo;
    profesor.activo = profesor.activo !== undefined ? activo : profesor.activo;

    await profesor.save();
    res.status(200).json(profesor);
}

controller.editarProfesor = editarProfesor

//Eliminar un profesor
const deleteProfesor = async (req, res) => {
    const id = req.params.id
    try {
        const profesor = await Profesor.findByPk(id);
        await profesor.destroy();
        res.status(200).json({message: `El profesor con id: ${id} se elimino correctamente`});
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el profesor', error })
    }
}

controller.deleteProfesor = deleteProfesor;

//Obtener todos los cursos de un profesor
const obtenerCursosDeProfesor = async (req, res) => {
    const id = req.params.id;

    // Verifica si el profesor existe e incluye los cursos asociados
    const profesor = await Profesor.findByPk(id, {
        include: {
            model: Curso,
            as: 'cursos',
            through: { attributes: [] } // Excluye atributos de la tabla intermedia
        }
    });

    res.status(200).json(profesor);
};

controller.obtenerCursosDeProfesor = obtenerCursosDeProfesor;

module.exports = controller;