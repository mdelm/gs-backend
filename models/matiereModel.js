const mongoose = require('mongoose')
const Schema = mongoose.Schema

const matiereModel= new Schema({

nom:{
  type : String,
  required: true
} ,

libelle:{
  type : String,
  required: true
},
note_ds:{
  type : String,
  required: true
},
coef:{
  type : String,
  required: true
},
note_exams:{
  type : String,
  required: true
},
absence:[{
  type: mongoose.Schema.Types.ObjectId,
  ref:'absence' 
}] ,

enseignant:[{
  type: mongoose.Schema.Types.ObjectId,
  ref:'enseignant' 
}],

module:[{
  type: mongoose.Schema.Types.ObjectId,
  ref:'module' 
}],

salle:[{
  type: mongoose.Schema
  .Types.ObjectId,
  ref:'salle' 
}],
etudiant:[{
  type: mongoose.Schema.Types.ObjectId,
  ref:'etudiant' 
}]

},

{timestamps: true}

);



module.exports= mongoose.model('matieres', matiereModel);