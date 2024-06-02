const {Materia, Carrera} = require('../db/models')
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

    if (materia) {
        res.status(200).json(materia)
    }
    else {
        res.status(404).json({ message: "Materia no encontrada" });
    }
}
controller.getMateriaById = getMateriaById;


//Borrar materia
const eliminarMateria = async (req, res) => {
    const id = req.params.id;

    try {
        const materia = await Materia.findByPk(id);
        if (materia) {
            await materia.destroy();
            res.status(200).json({ message: 'Materia eliminada con éxito' });
        } else {
            res.status(404).json({ message: 'Materia no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la materia', error });
    }
};

controller.eliminarMateria = eliminarMateria;


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


module.exports = controller