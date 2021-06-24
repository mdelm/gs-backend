
const absenceModel = require('../models/absenceModel')


module.exports={
    createAbsence:function(req, res){
        absenceModel.create(req.body, function(err, absence){
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add absence', status: 500, data:null})
            }else{
                res.json({message:'new absence added', status:200, data:absence})
            }
        })
    },

    getabsence:function(req,res){

         absenceModel.find({},function(err,absence){
            if(err){
                res.json({message:'error absence in system',status:500,data:null})
            } else{
                res.json({message:'all absence on system', status:200,data:absence})
            } 
        })
    },

    
    getOneabsence:function(req,res){
       absenceModel.findById({_id: req.params.id},req.body, function(err,absence){
            if(err){
                res.json({message:'absence is not found',status:500,data:null})
            }else{
                res.json({message:'absence is found', status:200,data:absence})
            }
       })

    },

    updateabsence:function(req,res){
        absenceModel.updateOne({_id: req.params.id},req.body,function(err,absence){
            if(err){
                res.json({message:'absence is not updated',status:500,data:null})
            }else{
                res.json({message:'absence is updated',status:200,data:absence})
            }
        });

    },
    
    deleteabsence:function(req,res){
        absenceModel.deleteOne({_id: req.params.id},req.body,function(err,absence){
            if(err){
                res.json({message:'error delete absence',status:500,data:null})
            }else{
                res.json({message:'absence is deleted', status:200,data:absence})
            }
        })
    }




}
