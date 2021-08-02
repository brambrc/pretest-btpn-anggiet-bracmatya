const express = require('express');
const router = express.Router();
const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
const userController = require('../app/api/controllers/userData');

client.on("error", function (err) {
  console.log("Error " + err);
});

function cacheAccountNumber(req, res, next) {
    const { accountNumber } = req.params;
  
    client.get(accountNumber, (err, data) => {
      if (err) throw err;
  
      if (data !== null) {
        var newObject = JSON.parse(data)
        res.json(newObject);
      } else {
        next();
      }
    });
  }



  function cacheIdentityNumber(req, res, next) {
    const { identityNumber } = req.params;
  
    client.get(identityNumber, (err, data) => {
      if (err) throw err;
  
      if (data !== null) {
        var newObject = JSON.parse(data)
        res.json(newObject);
      } else {
        next();
      }
    });
  }

router.post('/addUserData', userController.create);
router.get('/findByAccountNumber/:accountNumber', cacheAccountNumber, userController.findByAccountNumber);
router.get('/findByIdentityNumber/:identityNumber', cacheIdentityNumber, userController.findByIdentityNumber);
router.get('/', userController.getAll);
router.put('/', userController.update);
router.delete('/', userController.delete);
module.exports = router;