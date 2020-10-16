const { DataTypes } = require("sequelize");
const db = require("../configs/dbConfig");

const recordatoriosModel = db.define("recordatorios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    notNull: true,
  },
  importance: {
    type: DataTypes.STRING,
    notNull: true,
    defaultValue: "normal",
  },
  date: {
    type: DataTypes.DATEONLY,
    notNull: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = recordatoriosModel;
