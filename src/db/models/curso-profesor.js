'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CursoProfesor extends Model {
    
    static associate(models) {

      CursoProfesor.belongsTo(models.Curso,{
        as:'curso',
        foreignKey:'cursoId'
      });

      CursoProfesor.belongsTo(models.Profesor,{
        as:'profesor',
        foreignKey:'profesorId'
      });

    }
  }
  CursoProfesor.init({
    cursoId: DataTypes.NUMBER,
    profesorId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'CursoProfesor',
  });
  return CursoProfesor;
};