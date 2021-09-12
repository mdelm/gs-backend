const enseignantModel = require('../models/enseignantModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var refreshTokens ={} 
module.exports={
    createEnseignant:function(req, res){
        enseignantModel.create(req.body, function(err, Enseignant){

            if(err){
                console.log('err',err);
                res.json({message: 'error add Enseignant', status: 500, data:null})
            }else{
                res.json({message:'new Enseignant added', status:200, data:Enseignant})
            }
        }) 
    },
    getAll:function(req,res){
        enseignantModel.find({}).exec(function(err, Enseignant){
            if(err){
                console.log('err',err);
                res.json({message:'error find all', status: 500, data:null})
            }else{
                res.json({message:'find all Enseignant', status:200, data:Enseignant})
            }  
        })
    },
    getOneEnseignant:function(req,res){
        enseignantModel.findById({_id: req.params.id}).exec(function(err, Enseignant){
            if(err){
                console.log('err',err);
                res.json({message:'error find one Enseignant', status: 500, data:null})
            }else{
                res.json({message:'find one Enseignant', status:200, data:Enseignant})
            }
        })
    },
    updateEnseignant:function(req, res){
        enseignantModel.updateOne({_id: req.params.id},req.body,function(err, Enseignant){
            if(err){
                console.log('err',err);
                res.json({message: 'error update one Enseignant', status: 500, data:null})
            }else{
                res.json({message:'update one Enseignant', status: 200, data:Enseignant})
            }
        })
    },
    deleteOneEnseignant:function(req, res){
        enseignantModel.deleteOne({_id: req.params.id}).exec(function(err, Enseignant){
          if(err){
            console.log('err', err);
            res.json({message: 'error delete one Enseignant', status: 500, data:null})
          }else{
              res.json({message:'delete one Enseignant', status: 200, data:Enseignant})
          }
        })
    },
    deleteAllEnseignant:function(req, res){
        enseignantModel.remove({}).exec(function(err, Enseignant){
            if(err){
                console.log('err', err);
                res.jso,({message: 'error delete all', status: 500, data:null})
            }else{
                res.json({message:'delete all', status : 200, data:Enseignant })
            }
        })
    },

    uploadSignature: function(req, res) {
        try {
            const file = req.signature;
            if (!file) {
                return res.json({ status: 400, message: "No File" });
            } else {
                res.json({ status: 200, message: "Signature uploaded successfully" });
            }
        } catch (err) {
            console.log(err);
        }
    },

    login: function (req, res, next) {
        enseignantModel.findOne({
            cin: req.body.cin
        }, function (err, enseignantInfo) {
            if (err) {
                next(err);
            } else {
                if(enseignantInfo!=null){
                if (bcrypt.compareSync(req.body.matricule, enseignantInfo.matricule)) {
                   const token = jwt.sign({
                        id: enseignantInfo._id
                    }, req.app.get('secretkey'), {expiresIn: '1h'});
                    res.json({
                        status: "success",
                        message: "enseignant found",
                        data: {
                            Enseignant:enseignantInfo,
                            accesstoken: token,
                        }
                    });
                } else {
                    res.json({status: "error", message: "Invalid cin!!!", data: null});
                }
            }
            else{
                res.json({status: "error", message: "Invalid matricule!!!", data: null});
            }
        }
        });
    },

    logOut: function(req, res){
        var refreshToken = req.body.refreshToken

        console.log('refreshToken', refreshToken)

        jwt.verify(req.headers['x-access-token'], req.app.get('secretkey'))
        
        if(refreshToken in refreshTokens){
            delete refreshTokens[refreshToken]
        }

        res.json({msg: 'token expired', status:204})
    },
    /***************************fonction de refreshToken*******************************/
    //this method is essentiel to manipulate the authentification function
    refreshToken: function(req, res){
        var id = req.body.id
        var refreshToken = req.body.refreshToken

        if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == id)){
            var token = jwt.sign({
                id:id,
            }, req.app.get('secretkey'), {expiresIn: "5m"})
            
            var refreshToken = jwt.sign({id}, req.app.get('secretkey'))
            res.json({accesstoken: token, refreshToken: refreshToken})
        }else{
            res.sendStatus(401).json({})
        }
    },



    /***************************fonction d'authentification*******************************/

    authenticate: function (req, res, next) {
        enseignantModel.findOne({
            cin: req.body.cin
        }).exec(function (err, enseignantInfo) {
            console.log('enseidnant', enseignantInfo)
            if (err) {
                next(err)
            } else {
                if (enseignantInfo != null) {
                    if (bcrypt.compareSync(req.body.matricule, enseignantInfo.matricule)) { // /  var refreshToken = randtoken.uid(256)
                        const token = jwt.sign({
                            Enseignant:enseignantInfo,
                            id: enseignantInfo._id,
                        }, req.app.get('secretkey'), {expiresIn: '50m'});
                        const refreshToken = jwt.sign({
                            id: enseignantInfo._id,
                        }, req.app.get('secretkey'), {expiresIn: '50m'});
                        refreshTokens[refreshToken] = enseignantInfo._id
                        res.status(200).json({
                            status: 200,
                            message: "enseignant found!!!",
                            data: {
                                Enseignant: enseignantInfo,
                                accesstoken: token,
                                refreshToken: refreshToken
                            }
                        });
                    } else {
                        res.status(401).json({status: 401, message: "Invalid matricule!!!", data: null});
                    }
                } else {
                    res.status(401).json({status: 401, message: "Invalid cin!!!", data: null});
                }
            }
        });
    },

}