const AdminModel = require('../models/AdminModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');
var accesstoken ={}
var refreshTokens ={} 
module.exports={
    createAdmin:function(req, res){
        AdminModel.create(req.body, function(err, Admin){

            if(err){
                console.log('err',err);
                res.json({message: 'error add Admin', status: 500, data:null})
            }else{
                res.json({message:'new Admin added', status:200, data:Admin})
            }
        })
    },
   
    getOneAdmin:function(req,res){
        AdminModel.findById({_id: req.params.id}).exec(function(err, Admin){
            if(err){
                console.log('err',err);
                res.json({message:'error find one Admin', status: 500, data:null})
            }else{
                res.json({message:'find one Admin', status:200, data:Admin})
            }
        })
    },
    updateAdmin:function(req, res){
        AdminModel.updateOne({_id: req.params.id},req.body,function(err, Admin){
            if(err){
                console.log('err',err);
                res.json({message: 'error update one Admin', status: 500, data:null})
            }else{
                res.json({message:'update one Admin', status: 200, data:Admin})
            }
        })
    },
    deleteOneAdmin:function(req, res){
        AdminModel.deleteOne({_id: req.params.id}).exec(function(err, Admin){
          if(err){
            console.log('err', err);
            res.json({message: 'error delete one Admin', status: 500, data:null})
          }else{
              res.json({message:'delete one Admin', status: 200, data:Admin})
          }
        })
    },
 
    
    login: function (req, res, next) {
        AdminModel.findOne({
            matricule: req.body.matricule
        }, function (err, adminInfo) {
            if (err) {
                next(err);
            } else {
                if(adminInfo!=null){
                if (bcrypt.compareSync(req.body.password, adminInfo.password)) {
                   const token = jwt.sign({
                        id: adminInfo._id , 
                       
                    }, req.app.get('secretkey'), {expiresIn: '1h'});
                    res.json({
                        status: "success",
                        message: "Admin found",
                        data: {
                            Admin:adminInfo,
                            accesstoken: token,
                           role:adminInfo.role
                        }
                    });
                } else {
                    res.json({status: "error", message: "Invalid matricule!!!", data: null});
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
        AdminModel.findOne({
            matricule: req.body.matricule
        }).exec(function (err, adminInfo) {
            console.log('enseidnant', adminInfo)
            if (err) {
                next(err)
            } else {
                if (adminInfo != null) {
                    if (bcrypt.compareSync(req.body.password, adminInfo.password)) { // /  var refreshToken = randtoken.uid(256)
                        const token = jwt.sign({
                            Admin:adminInfo,
                            id: adminInfo._id,
                        }, req.app.get('secretkey'), {expiresIn: '50m'});
                        const refreshToken = jwt.sign({
                            id: adminInfo._id,
                        }, req.app.get('secretkey'), {expiresIn: '50m'});
                        refreshTokens[refreshToken] = adminInfo._id
                        res.status(200).json({
                            status: 200,
                            message: "Admin found!!!",
                            data: {
                                Admin: adminInfo,
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

      /***************************fonction de send mailer*******************************/
    //don't forget to open secure app to manipulate this function
    //and then close it for security process
    sendmailer : function(req  ,res){
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
                port: 2525,
                ssl: false,
                tls: true,
            service: 'gmail',
            auth: {
               user: 'oumaymanasri999@gmail.com',
               pass: 'oumayma28572241'
            }
        });

        
        var mailOptions = { 
            to:req.body.to,
            subject:req.body.subject,
            text: req.body.text,
        };
           transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log('error',error);
                    res.json({message:'error to send mail  ',status:500,data:null})
                } else {
                    res.json({message:' email send ',status:200,data:info})
                }
           });
    },

}