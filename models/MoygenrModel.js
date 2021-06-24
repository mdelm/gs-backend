const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MoygenerModel= new Schema({

  Moygener:{
type:String,
required:true
  },
      etuds:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"etuds"

      }
   
})
module.exports= mongoose.model('Moyenne', MoygenerModel);