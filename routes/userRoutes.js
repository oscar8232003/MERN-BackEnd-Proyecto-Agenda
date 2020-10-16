const express = require("express");
const userRoutes = express.Router();

//Controller
const userController = require("../controller/userController");

//Rutas
userRoutes.get("/", userController.allUser);
userRoutes.get("/search/:id", userController.findUser);
userRoutes.get("/create", userController.createUser);
userRoutes.get("/delete/:id", userController.deleteUser);
userRoutes.get("/update/:id", userController.updateUser);

module.exports = userRoutes;
