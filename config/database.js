const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/anggietBracmatya';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;