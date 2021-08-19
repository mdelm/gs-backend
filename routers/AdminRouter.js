const express = require('express');
const AdminController = require('../controllers/adminController');

const route = express.Router()
route.post('/AddAdmin', AdminController.createAdmin)

route.get('/AdminbyId/:id', AdminController. getOneAdmin)

route.put('/updateAdmin/:id',AdminController.updateAdmin)

route.delete('/AdmindeleteById/:id', AdminController.deleteOneAdmin)

route.post('/login',AdminController.login)

route.get('/logout', AdminController.logOut)

route.post('/authenticate',AdminController.authenticate)


route.post('/refreshToken',AdminController.refreshToken)

route.post('/sendMailer', AdminController.sendmailer)




module.exports = route



