'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    
    static associate(models) {
      Curso.belongsTo(models.Materia, {
        foreignKey: 'materiaId',
        as: 'materia'
      });

      Curso.belongsToMany(models.Profesor,{
        through: 'curso_profesor',
        as: 'profesores',
        foreignKey: 'curso_id'  
      })
    }
  }
  
  Curso.init({
    comision: DataTypes.STRING,
    turno: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    materiaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Curso',
  });
  return Curso;
};