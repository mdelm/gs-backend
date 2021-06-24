const express = require('express');
const MoygenerController = require('../controllers/MoygenerController');


const route = express.Router()
route.post('/AddMoy' , MoygenerController.createMoy)

route.get('/findbMoy', MoygenerController.getMoy) 
module.exports = route
