const express = require("express");
const entrepriseController = require("../controllers/entrepriseController");
const route = express.Router();

route.post("/addEntreprise", entrepriseController.createEntreprise);
route.get("/getEntreprise", entrepriseController.getEntreprise);

module.exports = route;