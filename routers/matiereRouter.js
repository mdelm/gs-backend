
const express = require('express');
const matiereController = require('../controllers/matiereController');


const route = express.Router()
route.post('/addMatiere', matiereController.createMatiere)

route.get('/findMatiere',matiereController.getMatiere) 

route.get('/MatierebyId/:id', matiereController. getOneMatiere)

route.put('/updateMatiere/:id',matiereController.updateMatiere)

route.delete('/matieredeleteById/:id', matiereController.deleteMatiere)

module.exports = route
