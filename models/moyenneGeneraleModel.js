const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoyenneGeneraleModel= new Schema({

  matricule: {
    type: String,
    required: true
  },

  nom: {
    type: String,
    required: true
  },

  prenom: {
    type: String,
    required: true
  },

  deliberation: {
    type: String,
    required: true
  },

  moyenne_generale: {
    type: String,
    required: true
  },

  annee_universitaire: {
    type: String,
    required: true
  },

  note_semestre1: {
    type: String,
    required: true
  },

  note_semestre2: {
    type: String,
    required: true
  },

  etudiant: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'etudiants',
    required: true
  },

  classe: {
    type: String,
    required: true
  }

    
});


module.exports= mongoose.model('moyenneGenerale', MoyenneGeneraleModel);