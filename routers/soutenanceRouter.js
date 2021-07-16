const express = require("express");
const soutenanceController = require("../controllers/soutenanceController");
const route = express.Router();

route.post("/addSoutenance", soutenanceController.addSoutenance);
route.get("/getSoutenance", soutenanceController.getSoutenance);
route.get("/getSoutenanceByEtudiant/:etud_id", soutenanceController.getSoutenanceByEtudiant);

module.exports = route;