const filiereModel = require('../models/filiereModel')


module.exports={
    createfiliere:function(req, res){
        
    filiereModel.create(req.body, function(err, filiere){
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add filiere', status: 500, data:null})
            }else{
                res.json({message:'new filiere added', status:200, data:filiere})
            }
        })
    },

    getfiliere:function(req,res){

        filiereModel.find({},function(err,filiere){
            if(err){
                res.json({message:'error filiere in system',status:500,data:null})
            } else{
                res.json({message:'all filiere on system', status:200,data:filiere})
            } 
        })
    },
  
    getOnefiliere:function(req,res){
        filiereModel.findById({_id: req.params.id},req.body, function(err,filiere){
             if(err){
                 res.json({message:'filiere is not found',status:500,data:null})
             }else{
                 res.json({message:'filiere is found', status:200,data:filiere})
             }
        })
 
     },
 
     updatefiliere:function(req,res){
        filiereModel.updateOne({_id: req.params.id},req.body,function(err,filiere){
             if(err){
                 res.json({message:'filiere is not updated',status:500,data:null})
             }else{
                 res.json({message:'filiere is updated',status:200,data:filiere})
             }
         });
        
     }, 
     
     deletefiliere:function(req,res){
         filiereModel.deleteOne({_id: req.params.id},req.body,function(err,filiere){
             if(err){
                 res.json({message:'error delete filiere',status:500,data:null})
             }else{
                 res.json({message:'filiere is deleted', status:200,data:filiere})
             }
         })
     }
 
 
 
 
 }
 