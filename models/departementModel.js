const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departementModel = new Schema({

    nom:{
        type:String,
        required : true
    },

    responsableDepartement:{
        type:String,
        required:true
        //champ obligatoire
      
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

    enseingnant:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'enseingnant' 
    }],
    
    filiere:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'filiere' 
    }],

})
 
module.exports = mongoose.model('departements',departementModel); //departements in Database