'use strict';
const {Curso,Profesor} = require("../models")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CursoProfesor extends Model {
    
    static associate(models) {
      models.Curso.belongsToMany(models.Profesor, {
        as:'profesores',
        through:models.CursoProfesor
      })
      models.Profesor.belongsToMany(models.Curso, {
        as:'cursos',
        through:models.CursoProfesor
      })
      
    }
  }
  CursoProfesor.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    }
  }, {
    sequelize,
    modelName: 'CursoProfesor',
  });
  return CursoProfesor;
};

