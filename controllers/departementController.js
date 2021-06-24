const departementModel = require('../models/departementModel');



module.exports={
       
    createDepartment:function(req, res){
        departementModel.create(req.body, function(err, departement){
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add departement', status: 500, data:null})
            }else{
                res.json({message:'new departement added', status:200, data:departement})
            }
        })
    },

    getAll:function(req,res){
        departementModel.find({}).exec(function(err, departement){
            if(err){
                console.log('err',err);
                res.json({message:'error find all', status: 500, data:null})
            }else{
                res.json({message:'find all departement', status:200, data:departement})
            }  
        })
    },

    getOneDepartement:function(req,res){
        departementModel.findById({_id: req.params.id}).exec(function(err, departement){
            if(err){
                console.log('err',err);
                res.json({message:'error find one departement', status: 500, data:null})
            }else{
                res.json({message:'find one departement', status:200, data:departement})
            }
        })
    },

    updateDepartement:function(req, res){
        departementModel.updateOne({_id: req.params.id},req.body,function(err, departement){
            if(err){
                console.log('err',err);
                res.json({message: 'error update one departement', status: 500, data:null})
            }else{
                res.json({message:'update one departement', status: 200, data:departement})
            }

        })
    },

    deleteOneDepartement:function(req, res){
        departementModel.deleteOne({_id: req.params.id}).exec(function(err, departement){
          if(err){
            console.log('err', err);
            res.json({message: 'error delete one departement', status: 500, data:null})
          }else{
              res.json({message:'delete one departement', status: 200, data:departement})
          }
        })
    },

    deleteAllDepartement:function(req, res){
        departementModel.remove({}).exec(function(err, departements){
            if(err){
                console.log('err', err);
                res.jso,({message: 'error delete all', status: 500, data:null})
            }else{
                res.json({message:'delete all', status : 200, data:departements })
            }
        })
    }




}