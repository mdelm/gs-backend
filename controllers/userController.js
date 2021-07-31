const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var refreshTokens ={} 
module.exports={
    createUser:function(req, res){
        userModel.create(req.body, function(err, user){
            if(err){
                console.log('err',err);
                res.json({message: 'error add user', status: 500, data:null})
            }else{
                res.json({message:'new user added', status:200, data:user})
            }
        })
    },
   
    getUsers:function(req,res){

        userModel.find({}).exec(function(err,users){
            if(err){
                res.json({message:'error users in system',status:500,data:null})
            } else{
                res.json({message:'all users on system', status:200,data:users})
            } 
        });
    },

    
    getOneUser:function(req,res){
       userModel.findById({_id: req.params.id}).exec(function(err,user){
            if(err){
                res.json({message:'user is not found',status:500,data:null})
            }else{
                res.json({message:'user is found', status:200,data:user})
            }
       });

    },
    
        
    updateUser: function(req,res) {
        userModel.updateOne({_id: req.params.id},req.body,function(err,user){
            if(err){
                res.json({message:'user is not updated',status:500,data:null})
            }else{
                res.json({message:'user is updated',status:200,data:user})
            }
        });

    },

    updateUserV2: async function(req, res) {
        const usr = await userModel.findOne({ _id: req.body._id });
        if (usr) {
            if (usr.nom !== req.body.nom) await usr.updateOne({ $set: { nom: req.body.nom } });
            if (usr.prenom !== req.body.prenom) await usr.updateOne({ $set: { prenom: req.body.prenom } });
            if (usr.date_naissance !== req.body.date_naissance) await usr.updateOne({ $set: { date_naissance: req.body.date_naissance } });
            if (usr.lieu_naissance !== req.body.lieu_naissance) await usr.updateOne({ $set: { lieu_naissance: req.body.lieu_naissance } });
            if (usr.adresse !== req.body.adresse) await usr.updateOne({ $set: { adresse: req.body.adresse } });
            if (usr.email !== req.body.email) await usr.updateOne({ $set: { email: req.body.email } });
            if (usr.gsm !== req.body.gsm) await usr.updateOne({ $set: { gsm: req.body.gsm } });
            if (usr.emailParent !== req.body.emailParent) await usr.updateOne({ $set: { emailParent: req.body.emailParent } });
            
            res.json({ message: 'user is updated', status: 200, data: usr });
        } else {
            res.json({ message:'user is not updated', status:500,data:null });
        }
    },

    deleteUsers:function(req,res){
        userModel.deleteOne({_id: req.params.id},function(err,user){
            if(err){
                res.json({message:'error delete',status:500,data:null})
            }else{
                res.json({message:'user is deleted', status:200,data:user})
            }
        })
    },

    
    deleteAll:function(req,res){
        userModel.remove({},function(err,user){
            if(err){
                res.json({message:'error delete',status:500,data:null})
            }else{
                res.json({message:'users are deleted', status:200,data:user})
            }
        }) 
    },

    
    login: function (req, res, next) {

        userModel.findOne({

            matricule: req.body.matricule

        }, function (err, userInfo) {

            if (err) {

                next(err); 

            } else {

                if(userInfo!=null){
                    console.log('reeeeq',req.body)
                    console.log('useerrrr',userInfo)
                if (bcrypt.compare(req.body.password, userInfo.password)) {

                   const token = jwt.sign({

                        id: userInfo._id 

                    }, req.app.get('secretkey'), {expiresIn: '1h'});

                    res.json({

                        status: "success", 

                        message: "user found",

                        data: {

                            user:userInfo,

                            accesstoken: token,

                        }

                    });

                } else {

                    res.json({status: "error", message: "Invalid password!!!", data: null});

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

    /***************************fonction d'authentification*******************************/

    authenticate: function (req, res, next) {
        userModel.findOne({
            matricule: req.body.matricule

        }).exec(function (err, userInfo) {
            console.log('user', userInfo)
            if (err) {
                next(err)
            } else {
                if (userInfo != null) {
                    if (bcrypt.compareSync(req.body.password, userInfo.password)) { // /  var refreshToken = randtoken.uid(256)
                        const token = jwt.sign({
                            user:userInfo,
                            id: userInfo._id,
                        }, req.app.get('secretkey'), {expiresIn: '50m'});
                        const refreshToken = jwt.sign({
                            id: userInfo._id,
                        }, req.app.get('secretkey'), {expiresIn: '50m'});
                        refreshTokens[refreshToken] = userInfo._id
                        res.status(200).json({
                            status: 200,
                            message: "user found!!!",
                            data: {
                                user: userInfo,
                                accesstoken: token,
                                refreshToken: refreshToken
                            }
                        });
                    } else {
                        res.status(401).json({status: 401, message: "Invalid password!!!", data: null});
                    }
                } else {
                    res.status(401).json({status: 401, message: "Invalid email!!!", data: null});
                }
            }
        });
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
    }
    
}