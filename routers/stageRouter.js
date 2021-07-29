const express = require("express");
const stageController = require("../controllers/stageController");

const route = express.Router();

route.post("/createStage", stageController.createStage);

route.get("/AllStages", stageController.AllStages);

route.get("/v2/AllStages", stageController.AllStagesV2);

route.post("/addSoutenance/:id", stageController.addSoutenance);

route.get("/soutenances/:etud_id", stageController.getSoutenancesByEtudiant);

route.get("/getStage/:id", stageController.getStage);

module.exports = route;