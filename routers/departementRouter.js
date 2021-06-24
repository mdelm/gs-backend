const express = require('express');
const departementController = require('../controllers/departementController');

const route = express.Router()



route.post('/addDepartement',departementController.createDepartment)
route.get('/findAllDepartement', departementController.getAll)
route.get('/findDepartementById/:id', departementController.getOneDepartement)
route.put('/updateDepartementById/:id', departementController.updateDepartement)
route.delete('/deleteOneDepartement/:id', departementController.deleteOneDepartement)
route.delete('/deleteAllDepartement', departementController.deleteAllDepartement)

module.exports = route