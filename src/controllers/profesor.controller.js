const {Profesor} = require('../db/models');
const controller = {};

const getAllProfesores = async (req, res) => {
    res.status(200).json(await Profesor.findAll({}))
}
controller.getAllProfesores = getAllProfesores

const getProfesorById = async(req, res) => {
    const id = req.params.id
    const profesor = await Profesor.findByPk(id)
    if (profesor) {
        res.status(200).json(profesor)
    }
    else {
        res.status(404).json({ message: `El profesor con ${id} no se encuentra registrado` });
    }
}
controller.getProfesorById = getProfesorById;

const createProfesor = async (req, res) => {
    const profesor = await Profesor.create(req.body)
    res.status(201).json(profesor)
}
controller.createProfesor = createProfesor

const editarProfesor = async (req,res) => {
    const id = req.params.id
    const {nombre, fechaNacimiento, legajo, activo} = req.body
    const profesor = await Profesor.findByPk(id);
    if(!profesor){
        res.status(404).json({message: `El profesor con ${id} no se encuentra registrado`})
    }

    profesor.nombre = profesor.nombre !== undefined ? nombre : profesor.nombre;
    profesor.fechaNacimiento = profesor.fechaNacimiento !== undefined ? fechaNacimiento : profesor.fechaNacimiento;
    profesor.legajo = profesor.legajo !== undefined ? legajo : profesor.legajo;
    profesor.activo = profesor.activo !== undefined ? activo : profesor.activo;

    await profesor.save();
    res.status(200).json(profesor);
}

controller.editarProfesor = editarProfesor

const deleteProfesor = async (req, res) => {
    const id = req.params.id
    try {
        const profesor = await Profesor.findByPk(id);
        if(profesor){
            await profesor.destroy();
            res.status(200).json({message: `El profesor con id: ${id} se elimino correctamente`});
        }
        else{
            res.status(404).json({message: `El profesor con id: ${id} no se encuentra registrado`})
        }
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el profesor', error })
    }
}

controller.deleteProfesor = deleteProfesor;

module.exports = controller;