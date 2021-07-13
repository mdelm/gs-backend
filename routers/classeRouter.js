
const express = require('express');
const classeController = require('../controllers/classeController');


const route = express.Router()
route.post('/addClasse', classeController.createClasse)

route.get('/findClasse',classeController.getClasse) 

route.get('/ClassebyId/:id', classeController. getOneClasse)

route.put('/updateClasse/:id',classeController.updateClasse)

route.delete('/classedeleteById/:id', classeController.deleteClasse)

route.get('/findClasseByEtudiant/:id', classeController.findClasseByEtudiant);

route.get("/:nom_classe/matieres", classeController.getAllMatieres);
route.get("/:nom_classe/etudiants", classeController.getAllEtudiants);

module.exports = route
