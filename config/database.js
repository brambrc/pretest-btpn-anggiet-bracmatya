const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://anggietBracmatya:Kmzway87aa@anggietbracmatya.6txdv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;