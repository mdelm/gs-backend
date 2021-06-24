
const express = require('express');
const absenceController = require('../controllers/absenceController');


const route = express.Router()
route.post('/addAbsence', absenceController.createAbsence)

route.get('/findAbsence',absenceController.getabsence) 

route.get('/AbsencebyId/:id', absenceController. getOneabsence)

route.put('/updateAbsence/:id',absenceController.updateabsence)

route.delete('/absencedeleteById/:id', absenceController.deleteabsence)

module.exports = route
