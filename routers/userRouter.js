const userController = require('../controllers/userController')
const express = require('express');
const upload =require('../middlware/upload')

const route = express.Router()

route.post('/adduser' , userController.createUser)   

route.get('/finduser',userController.getUsers) 

route.get('/UserbyId/:id', userController.getOneUser)

route.put('/updateUser/:id',userController.updateUser)

route.put('/v2/updateUser',userController.updateUserV2)

route.delete('/UserdeleteById/:id', userController.deleteUsers)

route.delete('/DeleteAll', userController.deleteAll)

route.post('/login',userController.login)

route.get('/logout', userController.logOut)

route.post('/sendMailer',userController.sendmailer)

route.post('/authenticate',userController.authenticate)

route.post('/refreshToken',userController.refreshToken)

 

module.exports = route  

