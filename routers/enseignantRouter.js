const express = require('express');
const enseignantController = require('../controllers/enseignantController');
const upload =require('../middlware/upload')

const route = express.Router()
route.post('/AddEnseignant', enseignantController.createEnseignant)

route.get('/findEnseignent',enseignantController.getAll) 

route.get('/EnseignantbyId/:id', enseignantController. getOneEnseignant)

route.put('/updateEnseignant/:id',enseignantController.updateEnseignant)

route.delete('/EnseignantdeleteById/:id', enseignantController.deleteOneEnseignant)

route.post('/login',enseignantController.login)

route.get('/logout', enseignantController.logOut)

route.post('/authenticate',enseignantController.authenticate)


route.post('/refreshToken',enseignantController.refreshToken)





module.exports = route



