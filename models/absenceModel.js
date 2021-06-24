const mongoose = require('mongoose')
const Schema = mongoose.Schema

const absenceModel= new Schema({

    Etat:{
        type : String,
        require: true
        } ,


        Heure_Debut:{
        type : Date ,
        require: true    
        },


        Heure_fin:{
        type : Date,
        require: true

        },
        
matiere:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'matiere' 
  }]


    
});



module.exports= mongoose.model('absence', absenceModel);