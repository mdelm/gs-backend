const mongoose = require('mongoose')
const Schema = mongoose.Schema

const devoirModel= new Schema({

    nom:{
        type : String,
        require: true
        } ,


        prof:{
        type : String ,
        require: true    
        },

        
matiere:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'matiere' 
  }]


    
});



module.exports= mongoose.model('devoir', devoirModel);