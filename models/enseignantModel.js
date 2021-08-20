const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const user=require('./userModel')
const enseignantModel= new Schema({

  matricule:{
    type:String, 
    require : true
},
password:{
    type: String,
    require: true,
    validate: {
       validator: function(v) {
            //Pour vérifier un mot de passe de 8 à 15 caractères contenant au moins une lettre minuscule,
           //une lettre majuscule, un chiffre numérique et un caractère spécial
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(v);
        },
        message: props => `${props.value} is not a valid password!`
    }

},

cin:{
    type:String,
    require : true,
    unique:true,
    validate: {
        validator: function(v) {
          return /^[0-9]{8}$/.test(v);
        },
        message: props => `${props.value} is not a valid cin!`
    }
},
nom:{
    type:String,
    require : true
    
},
prenom:{
    type:String,
    require:true
    //champ obligatoire
    
},
date_naissance:{
    type:Date,
    require:true
},
adresse:{
    type:String,
    require:true
},
GSM:{
    type:String,
    require:true ,
    validate: {
        validator: function(v) {
            return /^[0-9]{1,8}$/.test(v);
        },
        message: props => `${props.value} is not a valid gsm!`
    }
},
email:{
    type:String,
    require:true ,
    unique:true,
    validate: {
        validator: function(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
    }
},



departements:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'departement' 
}],

matiere:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'matiere' 
  }]

})


module.exports= user.discriminator('enseignant', enseignantModel);