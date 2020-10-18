const express = require("express");
const bodyParser = require("body-parser");
const db = require("./configs/dbConfig");
const { PORT, PROYECTNAME, API_VERSION } = require("./config");

//Rutas
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const recordatoriosRoutes = require("./routes/recordatoriosRoutes");

//Crear la app
const app = express(db);

//configuracion del puerto
app.listen(PORT);

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rutas
app.use(`/${PROYECTNAME}/${API_VERSION}/`, userRoutes);
app.use(`/${PROYECTNAME}/${API_VERSION}/auth`, authRoutes);
app.use(`/${PROYECTNAME}/${API_VERSION}/recordatorios`, recordatoriosRoutes);

//Sincronizar BD
//{ force: true }
db.sync()
  .then(() => {
    console.log("Sincronizado");
  })
  .catch((error) => {
    console.log("Error de Sincronizado");
  });

module.exports = app;
