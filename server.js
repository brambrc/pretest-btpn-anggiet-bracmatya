const express = require('express');
const logger = require('morgan');
var jwt = require('jsonwebtoken');
const userData = require('./routes/userData');
const userDataPrivate = require('./routes/userdataPrivate');
const mongoose = require('./config/database'); 
var favicon = require('serve-favicon')
var path = require('path')
 
const app = express();


mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.set('secretKey', 'nodeRestApi');
app.use(logger('dev'));
app.use(express.urlencoded());

app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.get('/', function(req, res){
 res.send(`<html>
 <head><link rel="shortcut icon" src="image/ico" href="./favicon.ico"></head>
 <h1> BTPN - Pre Test Anggiet Bracmatya : Build microservice API with node.js </h1>
 <h3> Generate Token  : method = GET url = /userData/generateToken</h3>
 <hr>
 <h2> For api below Please use token and place it on headers</h2>
 <h3> Create UserData : method = POST url = /userData/addUserData</h3>
 <p> Please include userName, identityNumber, accountNumber, and emailAddress on body </p>
 <hr>
 <h3> Get All Data UserData : method = GET url = /userData/</h3>
 <p> Please include token on headers</p>
 <hr>
 <h3> Get Data by AccountNumber : method = GET url = /userData/findByAccountNumber/{params}</h3>
 <p> Please include token on headers, and use account number as parameters</p>
 <hr>
 <h3> Get Data by IdentityNumber : method = GET url = /userData/findByIdentityNumber/{params}</h3>
 <p> Please include token on headers, and use identity number as parameters</p>
 <hr>
 <h3> Update UserData : method = PUT url = /userData/</h3>
 <p> Please include token on headers, and include userName, identityNumber, accountNumber, and emailAddress on body</p>
 <hr>
 <h3> Delete UserData : method = DELETE url = /userData/</h3>
 <p> Please include token on headers, and include accountNumber on body</p>
 

</html>`);
 
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




app.listen(3000, function(){ console.log('Node server listening on port 3000');});