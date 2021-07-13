const express = require('express');
const fileController = require('../controllers/fileController');
const route = express.Router();

route.post('/createListeEtudiantsRachte/:nom_classe', fileController.createListeEtudiantsRachte);

route.get('/getListeEtudiantsRachte/:nom_classe', fileController.fetchListeEtudiantsRachte);

route.post('/sendListeEtudiantsRachte/:nom_classe', fileController.sendListeEtudiantsRachte);

route.post('/createFormulaireDemandeDeStage', fileController.createFormulaireDemandeDeStage);

route.get('/fetchFormulaireDemandeDeStage', fileController.fetchFormulaireDemandeDeStage);

module.exports = route;
