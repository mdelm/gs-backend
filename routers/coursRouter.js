const express = require('express');
const coursController = require('../controllers/coursController');


const route = express.Router()
route.post('/AddCours' ,  coursController .createCours)

route.get('/findCours',coursController.getCours) 

route.get('/CoursbyId/:id', coursController. getOneCours)

route.put('/updateCours/:id',coursController.updateCours)

route.delete('/coursdeleteById/:id', coursController.deleteCours)

module.exports = route