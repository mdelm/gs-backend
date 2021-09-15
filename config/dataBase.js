const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/PFE11';

mongoose.connect(mongoDB,{useUnifiedTopology: true, useNewUrlParser:true}) ;

mongoose.Promise=global.Promise;

module.exports = mongoose ;