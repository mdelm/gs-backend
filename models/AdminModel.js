const mongoose = require('mongoose')
const Schema = mongoose.Schema
const user = require('./userModel')

const bcrypt = require('bcrypt')

const AdminModel = new Schema({

    matricule:{
        type:String, 
         required : true
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

})
AdminModel.pre('save',function(next){
    this.password=bcrypt.hashSync(this.password,10);
    next();
});

module.exports = user.discriminator('admin',AdminModel); //admin in Database