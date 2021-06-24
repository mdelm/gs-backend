const coursModel = require('../models/coursModel')


module.exports={
    createCours:function(req, res){
        
    coursModel.create(req.body, function(err, cours){
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add cours', status: 500, data:null})
            }else{
                res.json({message:'new cours added', status:200, data:cours})
            }
        })
    },

    getCours:function(req,res){

         coursModel.find({},function(err,cours){
            if(err){
                res.json({message:'error cours in system',status:500,data:null})
            } else{
                res.json({message:'all cours on system', status:200,data:cours})
            } 
        })
    },
  
    getOneCours:function(req,res){
        coursModel.findById({_id: req.params.id},req.body, function(err,cours){
             if(err){
                 res.json({message:'cours is not found',status:500,data:null})
             }else{
                 res.json({message:'cours is found', status:200,data:cours})
             }
        })
 
     },
 
     updateCours:function(req,res){
         coursModel.updateOne({_id: req.params.id},req.body,function(err,cours){
             if(err){
                 res.json({message:'cours is not updated',status:500,data:null})
             }else{
                 res.json({message:'cours is updated',status:200,data:cours})
             }
         });
 
     },
     
     deleteCours:function(req,res){
         coursModel.deleteOne({_id: req.params.id},req.body,function(err,cours){
             if(err){
                 res.json({message:'error delete cours',status:500,data:null})
             }else{
                 res.json({message:'cours is deleted', status:200,data:cours})
             }
         })
     }
 
 
 
 
 }
 