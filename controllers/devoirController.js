
const devoirModel = require('../models/devoirModel')


module.exports={
    createDevoir:function(req, res){
        devoirModel.create(req.body, function(err, devoir){
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add devoir', status: 500, data:null})
            }else{
                res.json({message:'new devoir added', status:200, data:devoir})
            }
        })
    },

    getdevoir:function(req,res){

         devoirModel.find({},function(err,devoir){
            if(err){
                res.json({message:'error devoir in system',status:500,data:null})
            } else{
                res.json({message:'all devoir on system', status:200,data:devoir})
            } 
        })
    },

    
    getOnedevoir:function(req,res){
       devoirModel.findById({_id: req.params.id},req.body, function(err,devoir){
            if(err){
                res.json({message:'devoir is not found',status:500,data:null})
            }else{
                res.json({message:'devoir is found', status:200,data:devoir})
            }
       })

    },

    updatedevoir:function(req,res){
        devoirModel.updateOne({_id: req.params.id},req.body,function(err,devoir){
            if(err){
                res.json({message:'devoir is not updated',status:500,data:null})
            }else{
                res.json({message:'devoir is updated',status:200,data:devoir})
            }
        });

    },
    
    deletedevoir:function(req,res){
        devoirModel.deleteOne({_id: req.params.id},req.body,function(err,devoir){
            if(err){
                res.json({message:'error delete devoir',status:500,data:null})
            }else{
                res.json({message:'devoir is deleted', status:200,data:devoir})
            }
        })
    }




}
