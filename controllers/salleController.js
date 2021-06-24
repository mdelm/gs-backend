const salleModel = require('../models/salleModel');



module.exports={
       
    createSalle:function(req, res){
        salleModel.create(req.body, function(err, salle){
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add salle', status: 500, data:null})
            }else{
                res.json({message:'new salle added', status:200, data:salle})
            }
        })
    },

    getAll:function(req,res){
        salleModel.find({}).exec(function(err, salle){
            if(err){
                console.log('err',err);
                res.json({message:'error find all', status: 500, data:null})
            }else{
                res.json({message:'find all salles', status:200, data:salle})
            }  
        })
    },

    getOneSalle:function(req,res){
        salleModel.findById({_id: req.params.id}).exec(function(err, salle){
            if(err){
                console.log('err',err);
                res.json({message:'error find one salle', status: 500, data:null})
            }else{
                res.json({message:'find one salle', status:200, data:salle})
            }
        })
    },

    updateSalle:function(req, res){
        salleModel.updateOne({_id: req.params.id},req.body,function(err, salle){
            if(err){
                console.log('err',err);
                res.json({message: 'error update one salle', status: 500, data:null})
            }else{
                res.json({message:'update one salle', status: 200, data:salle})
            }

        })
    },

    deleteOneSalle:function(req, res){
        salleModel.deleteOne({_id: req.params.id}).exec(function(err, salle){
          if(err){
            console.log('err', err);
            res.json({message: 'error delete one salle', status: 500, data:null})
          }else{
              res.json({message:'delete one salle', status: 200, data:salle})
          }
        })
    },

    deleteAllSalle:function(req, res){
        salleModel.remove({}).exec(function(err, salles){
            if(err){
                console.log('err', err);
                res.jso,({message: 'error delete all', status: 500, data:null})
            }else{
                res.json({message:'delete all', status : 200, data:salles })
            }
        })
    }




}