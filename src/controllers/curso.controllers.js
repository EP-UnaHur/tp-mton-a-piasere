const {Curso} = require('../db/models')
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

    if (curso) {
        res.status(200).json(curso)
    }
    else {
        res.status(404).json({ message: "Curso no encontrado" });
    }
}
controller.getCursoById = getCursoById;

//Crea un curso para una materia
const crearCursoParaMateria = async (req, res) => {
    const { materiaId } = req.params;
    const { nombre } = req.body;

    try {
        // Verifica si la materia existe
        const materia = await Materia.findByPk(materiaId);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

    // Crea el curso asociado a la materia
    const curso = await Curso.create({ comision, turno, fechaInicio, fechaFin, materiaId });
        res.status(201).json(curso);
    } catch (error) {
    res.status(500).json({ message: 'Error al crear el curso', error });
    }
};

controller.crearCursoParaMateria = crearCursoParaMateria;

// Obtener todos los cursos de una materia
const obtenerTodosLosCursosDeUnaMateria = async (req, res) => {
    const { materiaId } = req.params;
    const materia = await Materia.findByPk(materiaId, {
        include: [{
            model: Curso,
            as: 'cursos'
        }]
    });

    if (materia) {
        res.status(200).json(materia.cursos);
    } else {
        res.status(404).json({ message: 'Materia no encontrada' });
    }
}

controller.obtenerTodosLosCursosDeUnaMateria = obtenerTodosLosCursosDeUnaMateria;

//Borrar un curso por id
const eliminarCurso = async (req, res) => {
    const id = req.params.id;

    try {
        const curso = await Curso.findByPk(id);
        if (curso) {
            await curso.destroy();
            res.status(200).json({ message: 'Curso eliminado con éxito' });
        } else {
            res.status(404).json({ message: 'Curso no encontrado' });
        }
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
    if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Actualiza los datos del curso
    curso.comision = comision !== undefined ? comision : curso.comision;
    curso.turno = turno !== undefined ? turno : turno.comision;
    curso.fechaInicio = fechaInicio !== undefined ? fechaInicio : curso.fechaInicio;
    curso.fechaFin = fechaFin !== undefined ? fechaFin : curso.fechaFin;
    curso.materiaId = materiaId !== undefined ? materiaId : curso.materiaId;
    await curso.save();

    res.status(200).json(curso);
};

controller.actualizarCurso = actualizarCurso;


module.exports = controller