const express = require("express");
const attestationController = require("../controllers/attestationController");
const route = express.Router();

route.post("/demande", attestationController.postDemande);

route.get("/all", attestationController.getAll);

route.put("/confirm/ancadreur", attestationController.ancadreurConfirm);

route.put("/confirm/chef", attestationController.chefConfirm);

route.get("/download/:id", attestationController.downloadAttestation);

module.exports = route;