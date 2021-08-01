const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/userData');
router.get('/generateToken', userController.generateToken);
module.exports = router;