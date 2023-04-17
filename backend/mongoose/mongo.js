const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Users');



const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });



  const userModel = mongoose.model('users', UserSchema);



  async function nameFinder(param){
  const name = await userModel.find({ name: param});
  if(name){
    return true
  } else{
    return false
  }
   

  }

  
  async function emailFinder(param){
    const email = await userModel.find({ email: param});
    if(email){
        return true
    } else{
        return false
    }

  }

  

  module.exports = {userModel, nameFinder, emailFinder}