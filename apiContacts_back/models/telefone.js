"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Telefone extends Model {
    static associate(models) {
      this.belongsTo(models.Contato, {
        foreignKey: "idcontato",
        as: "contato",
      });
    }
  }
  Telefone.init(
    {
      idcontato: DataTypes.INTEGER,
      numero: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Telefone",
    }
  );
  return Telefone;
};
