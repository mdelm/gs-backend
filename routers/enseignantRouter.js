const express = require('express');
const enseignantController = require('../controllers/enseignantController');
const route = express.Router();
const multer = require("multer");

const upload = multer({ 
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
	    callback(null, "./uploads/signatures");
	  },
	  filename: (req, file, callback) => {
	    callback(null, `${req.params.cin}.jpg`);
	  }
	})
});

route.post('/AddEnseignant', enseignantController.createEnseignant)

route.get('/findEnseignent',enseignantController.getAll) 

route.get('/EnseignantbyId/:id', enseignantController. getOneEnseignant)

route.put('/updateEnseignant/:id',enseignantController.updateEnseignant)

route.delete('/EnseignantdeleteById/:id', enseignantController.deleteOneEnseignant)

route.post('/login',enseignantController.login)

route.get('/logout', enseignantController.logOut)

route.post('/authenticate',enseignantController.authenticate)


route.post('/refreshToken',enseignantController.refreshToken)


route.post("/uploadsignature/:cin", upload.single("signature"), enseignantController.uploadSignature);


module.exports = route



