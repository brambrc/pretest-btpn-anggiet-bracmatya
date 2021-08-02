const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
 userName: {
  type: String,
  trim: true,  
  required: true,
 },
 accountNumber: {
  type: String,
  trim: true,
  required: true
 },

 emailAddress: {
    type: String,
    trim: true,
    required: true
   },

   identityNumber: {
    type: String,
    trim: true,
    required: true
   },
});

module.exports = mongoose.model('anggietBracmatya', UserSchema);
