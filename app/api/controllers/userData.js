const userModel = require('../models/userData');
const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
const jwt = require('jsonwebtoken');
        module.exports = {
        
        //public function

        create: function(req, res, next) {
        userModel.create({ userName: req.body.userName, accountNumber: req.body.accountNumber, emailAddress: req.body.emailAddress, identityNumber: req.body.identityNumber}, function (err, result) {
            if (err) 
            next(err);
            else
            res.json({status: "success", message: "User Data added successfully!!!", data: null});
            
            });
        },

        generateToken: function(req, res, next) {
        
                const token = jwt.sign({id: 'random'}, req.app.get('secretKey'), { expiresIn: '1h' });
                res.json({status:"success", message: "token generate!!!", data:{token:token}});
        },

        //private function

        findByAccountNumber: async function(req, res, next) {
            var query = {accountNumber : req.params.accountNumber};
            var accountNumber = req.params.accountNumber;
            await userModel.find(query, function(err, dataUser){
                if(err) {
                    next(err);
                } else {
                    if(dataUser == '') {
                        res.json({status:"Error", message:"Data Not Found !", data:{dataUser: null}});
                    } else {
                        const response = JSON.stringify(dataUser);
                        client.setex(accountNumber, 3600, response);
                        res.json(dataUser);
                    }
                    
                }
            });
        },

        findByIdentityNumber: function(req, res, next) {
            var query = {identityNumber: req.params.identityNumber};
            var identityNumber = req.params.identityNumber;
            userModel.find(query, function(err, dataUser){
               if(err) {
                   next(err);
               }  else {
                if(dataUser == '') {
                    res.json({status:"Error", message:"Data Not Found !", data:{dataUser: null}});
                } else {
                    const response = JSON.stringify(dataUser);
                        client.setex(identityNumber, 3600, response);
                        res.json(dataUser);
                }
               }
            });
        },

        getAll: function(req, res, next){
            userModel.find({}, function(err, dataUser) {
                if(err){
                    next(err);
                } else {
                    if(dataUser == '') {
                        res.json({status:"Error", message:"Database are empty !", data:{dataUser: null}});
                    } else {
                        res.json({status:"success", message:"User Data Found !", data:{dataUser: dataUser}});
                    }
                }
            });
        },

        update: function(req, res, next){
            userModel.findByIdAndUpdate(req.body._id, {accountNumber: req.body.accountNumber, identityNumber: req.body.identityNumber, emailAddress: req.body.emailAddress, userName: req.body.userName }, function(err){
                if(err){
                    next(err);
                } else {
                    res.json({status:"success", message:"User Data has been updated !", data:{dataUser: null}});
                }
            });
        },

        delete: function(req, res, next){
            userModel.findByIdAndRemove(req.body._id, function(err){
                if(err){
                    next(err);
                } else {
                    res.json({status:"success", message:"User Data has been deleted !", data:{dataUser: null}});
                }
            });
        }


}