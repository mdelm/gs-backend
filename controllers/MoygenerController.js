const MoygenrModel = require('../models/MoygenrModel')


module.exports={
    createMoy:function(req, res){
        
        MoygenrModel.create(req.body, function(err, moy){
           
          
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add bulletin', status: 500, data:null})
            }else{
                res.json({message:'new bulletin added', status:200, data:moy})
    
            }
       
        })
    },

    getMoy:function(req,res){

        MoygenrModel.find({},function(err,moy){
            if(err){
                res.json({message:'error moy in system',status:500,data:null})
            } else{
                res.json({message:'all moy on system', status:200,data:moy})
            } 
        })
    }, 
 }
 