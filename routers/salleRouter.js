const express = require('express');
const salleController = require('../controllers/salleController');

const route = express.Router()



route.post('/addSalle',salleController.createSalle)
route.get('/findAllSalle', salleController.getAll)
route.get('/findSalleById/:id', salleController.getOneSalle)
route.put('/updateSalleById/:id', salleController.updateSalle)
route.delete('/deleteOneSalle/:id', salleController.deleteOneSalle)
route.delete('/deleteAllSalle', salleController.deleteAllSalle)

module.exports = route