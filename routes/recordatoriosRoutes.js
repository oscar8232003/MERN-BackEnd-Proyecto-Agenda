const express = require("express");
const route = express.Router();

//Controller
const recordatoriosController = require("../controller/recordatoriosController");

route.get("/bulk", recordatoriosController.bulkRecordatorios);

route.post(
  "/get-recordatorios-inicio",
  recordatoriosController.getRecordatoriosInicio
);

route.post(
  "/count-recordatorios-info",
  recordatoriosController.countRecordatoriosInfo
);

route.post(
  "/get-total-recordatorios",
  recordatoriosController.getTotalRecordatoriosList
);

route.post(
  "/recordatorios-search",
  recordatoriosController.getSearchRecordatorios
);

module.exports = route;
