const Sequelize = require("sequelize");
const { IP_SERVER, DBNAME, DBENGINE, USER, PASSWORD } = require("../config");

//Conexion a base de datos
const sequelize = new Sequelize(DBNAME, USER, PASSWORD, {
  host: IP_SERVER,
  dialect: DBENGINE,
});

/*
//Testeo de conexion
const test = async () => {
    try {
      await sequelize.authenticate();
      console.log("Conecction correctly");
    } catch (error) {
      console.log(error);
    }
  };
  
  test();
  */

module.exports = sequelize;
