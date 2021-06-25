const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteModel= new Schema({

  matiere: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'etudiants'
  },

  note: {
    type: String,
    required: true
  },

  type_note: {
    type: String,
    required: true
  },

  annee_universitaire: {
    type: String,
    required: true
  },

  semestre: {
    type: String,
    required: true
  },

  etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'etudiants',
    required: true
  }

    
});


module.exports= mongoose.model('note', noteModel);