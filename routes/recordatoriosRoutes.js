const express = require("express");
const route = express.Router();

//Controller
const recordatoriosController = require("../controller/recordatoriosController");

route.get("/bulk-recordatorios/:id", recordatoriosController.bulkRecordatorios);

route.get(
  "/recordatorios-inicio",
  recordatoriosController.getRecordatoriosInicio
);

route.get(
  "/recordatorios-info",
  recordatoriosController.countRecordatoriosInfo
);

route.get(
  "/recordatorios-list",
  recordatoriosController.getTotalRecordatoriosList
);

route.get(
  "/recordatorios-search",
  recordatoriosController.getSearchRecordatorios
);

route.post(
  '/add',
  recordatoriosController.addRecordatorio
)

route.delete(
  '/delete/:idRecordatorio',
  recordatoriosController.deleteRecordatorio
)

route.put(
  '/update/:idRecordatorio',
  recordatoriosController.updateRecordatorio
)

module.exports = route;
