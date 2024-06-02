const {Curso, Materia, Profesor} = require('../db/models')
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

//Asociar un curso a uno o varios profesores
const crearAsociacionCursoProfesor = async (req, res) => {
    const id = req.params.id;
    const { profesoresIds } = req.body;

    // Verifica si el curso existe
    const curso = await Curso.findByPk(id);
    if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
    }

    //FALTA ERROR 400

    // Verifica si todos los profesores existen
    const profesores = await Profesor.findAll({
        where: {
            id: profesoresIds
        }
    });

    if (profesores.length !== profesoresIds.length) {
        return res.status(404).json({ message: 'Uno o más profesores no encontrados' });
    }

    // Asocia los profesores al curso
    await curso.addProfesores(profesores);

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

    if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
    }

    res.status(200).json(curso.profesores);
};

controller.obtenerProfesoresDeCurso = obtenerProfesoresDeCurso;


module.exports = controller