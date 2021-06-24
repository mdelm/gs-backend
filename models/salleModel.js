const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salleModel = new Schema({

    nom:{
        type:String,
        required : true
      
        
    },

    libelle:{
        type:String,
        required:true
    },

   
matiere:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'matiere' 
  }], 
etudiant:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'etudiant' 
  }]

})
 
  
module.exports = mongoose.model('salles',salleModel); //salles in Database