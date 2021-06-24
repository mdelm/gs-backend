
const express = require('express');
const emploisDeTempsController = require('../controllers/emploiDeTempsController');


const route = express.Router()
route.post('/addEmplois', emploisDeTempsController.createEmplois)

route.get('/findEmplois',emploisDeTempsController.getemplois) 

route.get('/EmploisbyId/:id', emploisDeTempsController. getOneemplois)

route.put('/updateEmplois/:id',emploisDeTempsController.updateemplois)

route.delete('/emploisdeleteById/:id', emploisDeTempsController.deleteemplois)

module.exports = route
