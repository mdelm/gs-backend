const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const user = require('./userModel')

const EtudiantModel = new Schema({

    matricule:{
        type:String, 
         required : true
    },

    cin:{
        type:String,
         required : true, 
        unique:true,
        validate: {
            validator: function(v) {
              return /^[0-9]{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid cin!`
        },
        unique:true
    
    },  

    nom:{
        type:String,
         required : true
    },

    prenom:{
        type:String,
         required:true
    },
    
    civilite:{
        type:String,
         required : true
        
        }, 

    date_naissance:{
        type:Date,
         required:true
    },  

    lieu_naissance:{
        type:String,
         required:true
    },

    adresse:{
        type:String,
         required:true
    },
    email:{
        type:String,
         required:true,
        unique : true,
        validate: {
            validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
       
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

    password:{
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                //Pour vérifier un mot de passe de 8 à 15 caractères contenant au moins une lettre minuscule,
               //une lettre majuscule, un chiffre numérique et un caractère spécial
              return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(v);
            },
            message: props => `${props.value} is not a valid password!`
        }     
    },
  
    Baccalaureat:{
        type:String,
         required:true
    },

    mention:{
        type:String,
        required:true

    },

    parent:{
        type:String,
         required:true
    }, 

    gsm:{
        type:String,
         required:true,
        validate: {
            validator: function(v) {
                return /^[0-9]{1,8}$/.test(v);
            },
            message: props => `${props.value} is not a valid gsm_parent!`
        }
    }, 

    annee:{
        type:Number,
         required:true
    }, 
  
    moyenne:{
        type:String,
         required:true
    }, 

    Groupe:{
        type:String,
        required: true
    },

    emailParent:{
        type:String,
        required:true,
        unique : true,
        validate: {
            validator: function(v) {
              return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },

   filiere:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'filiere' 
    }],
    
matiere:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'matiere' 
  }],
  
salle:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'salle' 
  }]
})
 
  
EtudiantModel.pre('save',function(next){
    this.password=bcrypt.hashSync(this.password,10);
    next(); 
});
module.exports = user.discriminator('etudiant',EtudiantModel);