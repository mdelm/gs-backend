const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coursModel= new Schema({

nom:{
type: String,

}
})



module.exports= mongoose.model('cours', coursModel);