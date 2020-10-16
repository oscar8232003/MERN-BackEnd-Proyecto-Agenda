const express = require("express");
const route = express.Router();

//Controller
const authController = require("../controller/authController");

route.post("/register", authController.register);
route.post("/login", authController.login);
route.post("/refreshtoken", authController.refreshToken);

module.exports = route;
