
const matiereModel = require('../models/matiereModel')


module.exports={
    createMatiere:function(req, res){
        matiereModel.create(req.body, function(err, matiere){
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add matiere', status: 500, data:null})
            }else{
                res.json({message:'new matiere added', status:200, data:matiere})
            }
        })
    },


    
    getMatiere:function(req,res){

         matiereModel.find({},function(err,matiere){
            if(err){
                res.json({message:'error matiere in system',status:500,data:null})
            } else{
                res.json({message:'all matiere on system', status:200,data:matiere})
            } 
        })
    },

    
    getOneMatiere:function(req,res){
       matiereModel.findById({_id: req.params.id},req.body, function(err,matiere){
            if(err){
                res.json({message:'matiere is not found',status:500,data:null})
            }else{
                res.json({message:'matiere is found', status:200,data:matiere})
            }
       })

    },

    updateMatiere:function(req,res){
        matiereModel.updateOne({_id: req.params.id},req.body,function(err,matiere){
            if(err){
                res.json({message:'matiere is not updated',status:500,data:null})
            }else{
                res.json({message:'matiere is updated',status:200,data:matiere})
            }
        });

    },
    
    deleteMatiere:function(req,res){
        matiereModel.deleteOne({_id: req.params.id},req.body,function(err,matiere){
            if(err){
                res.json({message:'error delete matiere',status:500,data:null})
            }else{
                res.json({message:'matiere is deleted', status:200,data:matiere})
            }
        });
    }




}
