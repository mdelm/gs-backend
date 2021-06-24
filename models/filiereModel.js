const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filiereModel= new Schema({

nom_filiere:{
type: String,
required: true
},


niveau:{
    type: String,
    required: true
},
    
departement:[{
  type: mongoose.Schema.Types.ObjectId,
  ref:'departement' 
}],
    
etudiant:{
  type: mongoose.Schema.Types.ObjectId,
  ref:'etudiant' 
},

    
})


module.exports= mongoose.model('filiere', filiereModel);