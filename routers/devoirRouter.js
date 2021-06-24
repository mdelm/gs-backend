
const express = require('express');
const devoirController = require('../controllers/devoirController');


const route = express.Router()
route.post('/adddevoir', devoirController.createDevoir)

route.get('/finddevoir',devoirController.getdevoir) 

route.get('/devoirbyId/:id', devoirController.getOnedevoir )

route.put('/updatedevoir/:id',devoirController.updatedevoir)

route.delete('/devoirdeleteById/:id', devoirController.deletedevoir)

module.exports = route
