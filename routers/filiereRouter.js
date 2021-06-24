
const express = require('express');
const filiereController = require('../controllers/filiereController');


const route = express.Router()
route.post('/addfiliere', filiereController.createfiliere)

route.get('/findfiliere',filiereController.getfiliere) 

route.get('/filierebyId/:id', filiereController. getOnefiliere)

route.put('/updatefiliereMatiere/:id',filiereController.updatefiliere)

route.delete('/filieredeleteById/:id', filiereController.deletefiliere)

module.exports = route
