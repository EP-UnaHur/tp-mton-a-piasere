'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profesor.belongsToMany(models.Curso,{
        through: 'CursoProfesor',
        as:'cursos',
        foreignKey: 'profesorId'
      })
    }
  }
  Profesor.init({
    nombre: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE,
    legajo: DataTypes.INTEGER,
    activo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profesor',
  });
  return Profesor;
};