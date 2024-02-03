const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('type', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    es_name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    en_name:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    image:{
      type: DataTypes.TEXT,
      allowNull:true,
    },
    icon:{
      type:DataTypes.TEXT,
      allowNull:true,
    },
    pokemon:{
      type: DataTypes.JSONB,
      allowNull: true
    },
  },{timestamps: false})}