const etudiantController = require('../controllers/etudiantController')
const express = require('express');

const route = express.Router()

route.post('/login', etudiantController.login)
route.post('/addEtudiant' , etudiantController.createEtudiant)
route.get('/findAllEtudiant',   etudiantController.getAll)
route.get('/findEtudiantById/:id', etudiantController.getOneEtudiant)
route.put('/updateEtudiantById/:id', etudiantController.updateEtudiant)
route.delete('/deleteOneEtudiant/:id', etudiantController.deleteOneEtudiant)
route.delete('/deleteAllEtudiant', etudiantController.deleteAllEtudiant)

route.post('/login',etudiantController.login)

route.get('/logout', etudiantController.logOut)

route.post('/refreshToken',etudiantController.refreshToken)

route.post('/authenticate',etudiantController.authenticate)

module.exports = route