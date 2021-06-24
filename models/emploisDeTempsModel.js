const mongoose = require('mongoose');

const Schema = mongoose.Schema

const emploisDeTempsModel= new Schema({

  classe:{
    type : String,
    require: true
    } ,

    annee:{
      type : String,
      require: true
      } ,

    semestre:{
    type : String ,
    require: true    
    },
    
    
    emplois:{
      type : String ,
      require: true    
      },

      
      matiere:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'matiere' 
      }]

    
});



module.exports= mongoose.model('emplois du temps', emploisDeTempsModel);