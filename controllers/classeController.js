const classeModel = require('../models/classeModel');
const matiereModel = require("../models/matiereModel");
const etudiantModel = require("../models/etudiantModel");


module.exports={
    createClasse:function(req, res){
        classeModel.create(req.body, function(err, classe){
            if(err){
                console.log('err',err) ;
                res.json({message: 'error add classe', status: 500, data:null})
            }else{
                res.json({message:'new classe added', status:200, data:classe})
            }
        })
    },

    getClasse:function(req,res){

         classeModel.find({},function(err,classe){
            if(err){
                res.json({message:'error classe in system',status:500,data:null})
            } else{
                res.json({message:'all classe on system', status:200,data:classe})
            } 
        })
    },

    
    getOneClasse:function(req,res){
       classeModel.findById({_id: req.params.id},req.body, function(err,classe){
            if(err){
                res.json({message:'classe is not found',status:500,data:null})
            }else{
                res.json({message:'classe is found', status:200,data:classe})
            }
       })

    },

    updateClasse:function(req,res){
        classeModel.updateOne({_id: req.params.id},req.body,function(err,classe){
            if(err){
                res.json({message:'classe is not updated',status:500,data:null})
            }else{
                res.json({message:'classe is updated',status:200,data:classe})
            }
        });

    },
    
    deleteClasse:function(req,res){
        classeModel.deleteOne({_id: req.params.id},req.body,function(err,classe){
            if(err){
                res.json({message:'error delete classe',status:500,data:null})
            }else{
                res.json({message:'classe is deleted', status:200,data:classe})
            }
        })
    },

    getAllMatieres: async function(req, res) {
        let classe = await classeModel.findOne({ nom_classe: req.params.nom_classe });
        if (classe !== null) {
            res.json({ 
                status: 200, 
                data: await matiereModel.find({ "_id": { $in: classe.matieres } }) 
            });
        } else {
            res.json({message: "Classe not found", status: 404, data: null});
        }
    },

    getAllEtudiants: async function(req, res) {
        let classe = await classeModel.findOne({ nom_classe: req.params.nom_classe });
        if (classe !== null) {
            res.json({ 
                status: 200, 
                data: await etudiantModel.find({ "_id": { $in: classe.etudiants } }) 
            });
        } else {
            res.json({message: "Classe not found", status: 404, data: null});
        }
    }


}
