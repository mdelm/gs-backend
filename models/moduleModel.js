const mongoose = require('mongoose')
const Schema = mongoose.Schema

const moduleModel = new Schema({

    nom:{
        type:String,
        required : true
        //champ obligatoire
     /*   validate: {
            validator: function(v) {
                return /^[a-zA-Z._-]+$/.test(v);
            },
            message: props => `${props.value} is not a valid nom!`
        }*/
    },

    libelle:{  
        type:String,
        required:true
       /* validate: {
            validator: function(v) {
                return /^[a-zA-Z._-]+$/.test(v);
            },
            message: props => `${props.value} is not a valid libelle!`
        }*/
    },
   
      
matiere:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'matiere' 
  }],
  note:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'note' 
  }]
  
})  
 
  
module.exports = mongoose.model('modules',moduleModel); //modules in Database