
const emploisDeTempsModel = require('../models/emploisDeTempsModel');


module.exports={
    createEmplois:function(req, res){
        emploisDeTempsModel.create(req.body, function(err, emplois){
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add emplois', status: 500, data:null})
            }else{
                res.json({message:'new emplois added', status:200, data:emplois})
            }
        })
    },

    getemplois:function(req,res){

         emploisDeTempsModel.find({},function(err,emplois){
            if(err){
                res.json({message:'error emplois in system',status:500,data:null})
            } else{
                res.json({message:'all emplois on system', status:200,data:emplois})
            } 
        })
    },

    
    getOneemplois:function(req,res){
       emploisDeTempsModel.findById({_id: req.params.id},req.body, function(err,emplois){
            if(err){
                res.json({message:'emplois is not found',status:500,data:null})
            }else{
                res.json({message:'emplois is found', status:200,data:emplois})
            }
       })

    },

    updateemplois:function(req,res){
        emploisDeTempsModel.updateOne({_id: req.params.id},req.body,function(err,emplois){
            if(err){
                res.json({message:'emplois is not updated',status:500,data:null})
            }else{
                res.json({message:'emplois is updated',status:200,data:emplois})
            }
        });

    },
    
    deleteemplois:function(req,res){
        emploisDeTempsModel.deleteOne({_id: req.params.id},req.body,function(err,emplois){
            if(err){
                res.json({message:'error delete emplois',status:500,data:null})
            }else{
                res.json({message:'emplois is deleted', status:200,data:emplois})
            }
        })
    }




}
