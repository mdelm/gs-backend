const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteModel= new Schema({

  matieres: [{
    nom_matiere: {
      type: String
    },
    examan: {
      type: String
    },
    oral: {
      type: String
    },
    moy_mat: {
      type: String
    },
    coefficient: {
      type: String
    }
  }],

  nom_etudiant: {
    type: String
  },

  nom_module: {
    type: String
  },

  num_semestre: {
    type: String
  },

  note_module: {
    type: String
  },

  coefficient: {
    type: String
  },

  etudiants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'etudiants' 
  }]

    
});


module.exports= mongoose.model('note', noteModel);