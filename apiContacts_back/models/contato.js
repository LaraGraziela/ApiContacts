"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contato extends Model {
    static associate(models) {
      this.hasMany(models.Telefone, { foreignKey: "idcontato" });
    }
  }
  Contato.init(
    {
      nome: DataTypes.STRING,
      idade: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Contato",
    }
  );
  return Contato;
};
