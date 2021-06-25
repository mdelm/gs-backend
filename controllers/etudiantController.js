const etudiantModel = require('../models/etudiantModel')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var refreshTokens ={} 


module.exports={
    createEtudiant:function(req, res){
        console.log('reeq',req.body);
        etudiantModel.create(req.body, function(err, Etudiant){
            if(err){
                console.log('err',err);
                res.json({message: 'error add Etudiant', status: 500, data:null})
            }else{
                res.json({message:'new Etudiant added', status:200, data:Etudiant})
            }
        })
    },

    getAll:function(req,res){
        etudiantModel.find({}).exec(function(err, Etudiants){
            if(err){
                console.log('err',err);
                res.json({message:'error find all', status: 500, data:null})
            }else{
                res.json({message:'find all etudiants', status:200, data:Etudiants})
            }  
        })
    },

    getOneEtudiant:function(req,res){
        etudiantModel.findById({_id: req.params.id}).exec(function(err, Etudiant){
            if(err){
                console.log('err',err);
                res.json({message:'error find one etudiant', status: 500, data:null})
            }else{
                res.json({message:'find one etudiant', status:200, data:Etudiant})
            } 
        })
    },

    updateEtudiant:function(req, res){
        etudiantModel.updateOne({_id: req.params.id},req.body,function(err, Etudiant){
            if(err){
                console.log('err',err);
                res.json({message: 'error update one etudiant', status: 500, data:null})
            }else{
                res.json({message:'update one etudiant', status: 200, data:Etudiant})
            }

        })
    },

    deleteOneEtudiant:function(req, res){
        etudiantModel.deleteOne({_id: req.params.id}).exec(function(err, Etudiant){
          if(err){
            console.log('err', err);
            res.json({message: 'error delete one etudiant', status: 500, data:null})
          }else{
              res.json({message:'delete one etudiant', status: 200, data:Etudiant})
          }
        })
    },

    deleteAllEtudiant:function(req, res){
        etudiantModel.remove({}).exec(function(err, Etudiants){
            if(err){
                console.log('err', err);
                res.jso,({message: 'error delete all', status: 500, data:null})
            }else{
                res.json({message:'delete all', status : 200, data:Etudiants })
            }
        })
    },

    login: function (req, res, next) {

        etudiantModel.findOne({

            cin: req.body.cin

        }, function (err, etudiantInfo) {

            if (err) {

                next(err);

            } else {
                if(etudiantInfo!=null){
                if (bcrypt.compareSync(req.body.matricule, etudiantInfo.matricule)) {

                   const token = jwt.sign({

                        id: etudiantInfo._id

                    }, req.app.get('secretkey'), {expiresIn: '1h'});

                    res.json({

                        status: "success",

                        message: "etudiant found",

                        data: {

                            Etudiant:etudiantInfo,

                            accesstoken: token,

                        }

                    });

                } else {

                    res.json({status: "error", message: "Invalid matricule!!!", data: null});

                }

            }

            else{

                res.json({status: "error", message: "Invalid cin!!!", data: null});

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
    

 /***************************fonction d'authentification*******************************/

 authenticate: function (req, res, next) {
    etudiantModel.findOne({
        cin: req.body.cin
    }).exec(function (err, etudiantInfo) {
        console.log('etudiant', etudiantInfo)
        if (err) {
            next(err)
        } else {
            if (etudiantInfo != null) {
                if (bcrypt.compareSync(req.body.matricule, etudiantInfo.matricule)) { // /  var refreshToken = randtoken.uid(256)
                    const token = jwt.sign({
                        Etudiant:etudiantInfo,
                        id: etudiantInfo._id,
                    }, req.app.get('secretkey'), {expiresIn: '50m'});
                    const refreshToken = jwt.sign({
                        id: etudiantInfo._id,
                    }, req.app.get('secretkey'), {expiresIn: '50m'});
                    refreshTokens[refreshToken] = etudiantInfo._id
                    res.status(200).json({
                        status: 200,
                        message: "etudiant found!!!",
                        data: {
                            Etudiant: etudiantInfo,
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

  

}