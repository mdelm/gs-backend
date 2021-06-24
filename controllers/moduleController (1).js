const moduleModel = require('../models/moduleModel');



module.exports={
       
    createModule:function(req, res){
        moduleModel.create(req.body, function(err, module){
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add module', status: 500, data:null})
            }else{
                res.json({message:'new module added', status:200, data:module})
            }
        })
    },

    getAll:function(req,res){
        moduleModel.find({}).exec(function(err, modules){
            if(err){
                console.log('err',err);
                res.json({message:'error find all', status: 500, data:null})
            }else{
                res.json({message:'find all modules', status:200, data:modules})
            }  
        })
    },

    getOneModule:function(req,res){
        moduleModel.findById({_id: req.params.id}).exec(function(err, module){
            if(err){
                console.log('err',err);
                res.json({message:'error find one module', status: 500, data:null})
            }else{
                res.json({message:'find one module', status:200, data:module})
            }
        })
    },

    updateModule:function(req, res){
        moduleModel.updateOne({_id: req.params.id},req.body,function(err, module){
            if(err){
                console.log('err',err);
                res.json({message: 'error update one module', status: 500, data:null})
            }else{
                res.json({message:'update one module', status: 200, data:module})
            }

        })
    },

    deleteOneModule:function(req, res){
        moduleModel.deleteOne({_id: req.params.id}).exec(function(err, module){
          if(err){
            console.log('err', err);
            res.json({message: 'error delete one module', status: 500, data:null})
          }else{
              res.json({message:'delete one module', status: 200, data:module})
          }
        })
    },

    deleteAllModule:function(req, res){
        moduleModel.remove({}).exec(function(err, modules){
            if(err){
                console.log('err', err);
                res.jso,({message: 'error delete all', status: 500, data:null})
            }else{
                res.json({message:'delete all', status : 200, data:modules })
            }
        })
    }




}