const express = require('express');
const logger = require('morgan');
var jwt = require('jsonwebtoken');
const userData = require('./routes/userData');
const userDataPrivate = require('./routes/userdataPrivate');
const mongoose = require('./config/database'); 
 
const app = express();


mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.set('secretKey', 'nodeRestApi');
app.use(logger('dev'));
app.use(express.urlencoded());
app.get('/', function(req, res){
 res.json({"BTPN - Pre Test" : "Build microservice API with node.js"});
 
});

//public route (generateToken, create user data)
app.use('/userData', userData);

//private route (find data, update, delete require token)
app.use('/userDataPrivate',validateToken ,userDataPrivate);


//for validating token when RUD
function validateToken(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
          res.json({status:"error", message: err.message, data:null});
        }else{
          next();
        }
      });
}

app.use(function(req, res, next) {
    let err = new Error('Not Found');
       err.status = 404;
       next(err);
   });

app.use(function(err, req, res, next) {
    console.log(err);
    
     if(err.status === 404)
      res.status(404).json({message: "Not found"});
     else 
       res.status(500).json({message: "Something looks wrong :( !!!"});
});




app.listen(process.env.PORT || 3000, function(){ console.log('Node server listening on port 3000');});