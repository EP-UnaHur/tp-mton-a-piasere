const {Materia, Carrera, Curso} = require('../db/models')
const controller = {}

//Listar todas las materias
const getAllMaterias = async (req, res) => {
    res.status(200).json(await Materia.findAll({}))
}
controller.getAllMaterias = getAllMaterias

//Buscar materia por ID
const getMateriaById = async(req, res) => {
    const id = req.params.id
    const materia = await Materia.findByPk(id)
    res.status(200).json(materia)
}
controller.getMateriaById = getMateriaById;


//Borrar materia
const eliminarMateria = async (req, res) => {
    const id = req.params.id;

    try {
        const materia = await Materia.findByPk(id);
        await materia.destroy();
        res.status(200).json({ message: 'Materia eliminada con éxito' });

    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la materia', error });
    }
};

controller.eliminarMateria = eliminarMateria;


// Obtener todos los cursos de una materia
const obtenerTodosLosCursosDeUnaMateria = async (req, res) => {
    const materiaId = req.params.id;
    const materia = await Materia.findByPk(materiaId, {
        include: [{
            model: Curso,
            as: 'cursos'
        }]
    });
    res.status(200).json(materia);

}

controller.obtenerTodosLosCursosDeUnaMateria = obtenerTodosLosCursosDeUnaMateria;

//Crea un curso para una materia
const crearCursoParaMateria = async (req, res) => {
    const materiaId = req.params.id;
    const { comision, turno, fechaInicio, fechaFin } = req.body;
    try {
    const curso = await Curso.create({ comision, turno, fechaInicio, fechaFin, materiaId });
        res.status(201).json(curso);
    } catch (error) {
    res.status(500).json({ message: 'Error al crear el curso', error });
    }
};

controller.crearCursoParaMateria = crearCursoParaMateria;


module.exports = controller