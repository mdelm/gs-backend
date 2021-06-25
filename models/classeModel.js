const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classeModel= new Schema({

	nom_classe:{
		type: String,
		required: true
	},
	    
	filliere: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref:'filliere',
	  required: true
	},
	    
	etudiants:[{
	  type: mongoose.Schema.Types.ObjectId,
	  ref:'etudiant' 
	}],

	matieres:[{
	  type: mongoose.Schema.Types.ObjectId,
	  ref:'matiere' 
	}],

    
})


module.exports= mongoose.model('classe', classeModel);