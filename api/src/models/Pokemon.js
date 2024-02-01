const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageAnimated: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    base_hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    base_attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    base_defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    base_speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, { timestamps: false });
};
