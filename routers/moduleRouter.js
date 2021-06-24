const express = require('express');
const moduleController = require('../controllers/moduleController (1)');

const route = express.Router()



route.post('/addModule',moduleController.createModule)
route.get('/findAllModule', moduleController.getAll)
route.get('/findModuleById/:id', moduleController.getOneModule)
route.put('/updateModuleById/:id', moduleController.updateModule)
route.delete('/deleteOneModule/:id', moduleController.deleteOneModule)
route.delete('/deleteAllModule', moduleController.deleteOneModule)

module.exports = route 