'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CursoProfesor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CursoProfesor.init({
    cursoId: DataTypes.NUMBER,
    profesorId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Curso-profesor',
  });
  return CursoProfesor;
};