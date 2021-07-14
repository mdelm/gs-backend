const express = require("express");
const stageController = require("../controllers/stageController");

const route = express.Router();

route.post("/createStage", stageController.createStage);

route.get("/findStage", stageController.getStage);

module.exports = route;