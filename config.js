require("dotenv").config({ path: "variables.env" });

exports.API_VERSION = process.env.API_VERSION;
exports.IP_SERVER = process.env.IP_SERVER || "localhost";
exports.PORT = process.env.PORT || 5000;
exports.DBPORT = process.env.DBPORT || 3006;
exports.DBNAME = process.env.DBNAME || "proyecto_agenda";
exports.DBENGINE = process.env.DBENGINE || "mariadb";
exports.USER = process.env.USER || "root";
exports.PASSWORD = process.env.PASSWORD || "";
exports.SECRET = "oskar823";
