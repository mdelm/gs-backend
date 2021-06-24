const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userModel= new Schema({

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

cin:{
    type:String,
    required : true,
    unique:true,
    validate: {
        validator: function(v) {
          return /^[0-9]{8}$/.test(v);
        },
        message: props => `${props.value} is not a valid cin!`
    }
},
email:{
    type:String,
    required:true ,
    unique:true,
    validate: {
        validator: function(v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
    }
}


})

userModel.pre('save',function(next){
    this.password=bcrypt.hashSync(this.password,10);
    next();
});


module.exports= mongoose.model('useeersss', userModel);