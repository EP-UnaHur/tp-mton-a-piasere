const { where } = require('sequelize')
const {Curso, Materia, Profesor, CursoProfesor} = require('../db/models')
const controller = {}

//Listar todos los cursos
const getAllCursos = async (req, res) => {
    res.status(200).json(await Curso.findAll({}))
}
controller.getAllCursos = getAllCursos

//Buscar un curso por ID
const getCursoById = async(req, res) => {
    const id = req.params.id
    const curso = await Curso.findByPk(id)
    res.status(200).json(curso)
}
controller.getCursoById = getCursoById;


//Borrar un curso por id
const eliminarCurso = async (req, res) => {
    const id = req.params.id;

    try {
        const curso = await Curso.findByPk(id);
        await curso.destroy();
        res.status(200).json({ message: 'El curso fue eliminado con exito' });

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el curso', error });
    }
};

controller.eliminarCurso = eliminarCurso;

//Actualizar los datos de un curso
const actualizarCurso = async (req, res) => {
    const { id } = req.params;
    const { comision, turno, fechaInicio, fechaFin, materiaId } = req.body;
    const curso = await Curso.findByPk(id);

    curso.comision = comision !== undefined ? comision : curso.comision;
    curso.turno = turno !== undefined ? turno : turno.comision;
    curso.fechaInicio = fechaInicio !== undefined ? fechaInicio : curso.fechaInicio;
    curso.fechaFin = fechaFin !== undefined ? fechaFin : curso.fechaFin;
    curso.materiaId = materiaId !== undefined ? materiaId : curso.materiaId;

    await curso.save();

    res.status(200).json(curso);
};

controller.actualizarCurso = actualizarCurso;

//Asociar un curso a uno o varios profesores
const crearAsociacionCursoProfesor = async (req, res) => {
    const idCurso = req.params.id;
    const profesores = req.body;
    profesores.map(async (profe) =>{
        await CursoProfesor.create({CursoId: idCurso, ProfesorId: profe.id})
    });
    res.status(201).json({ message: 'Asociación creada con éxito' });
};

controller.crearAsociacionCursoProfesor = crearAsociacionCursoProfesor;

//Obtener todos los profesores de un Curso
const obtenerProfesoresDeCurso = async (req, res) => {
    const id = req.params.id;

    // Verifica si el curso existe e incluye los profesores asociados
    const curso = await Curso.findByPk(id, {
        include: {
            model: Profesor,
            as: 'profesores',
            through: { attributes: [] } // Excluye atributos de la tabla intermedia
        }
    });
    res.status(200).json(curso);
};

controller.obtenerProfesoresDeCurso = obtenerProfesoresDeCurso;


module.exports = controller