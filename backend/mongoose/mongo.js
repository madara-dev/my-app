const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Users');



const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });



  const userModel = mongoose.model('users', UserSchema);



  async function nameFinder(param){
     const name = await (await userModel.find({ name: param}).exec()).pop()
    
     if(name){
      return true
     } else if(name === 'undefined'){
        return false
     }

 }

  
 async function emailFinder(param){
    const email = await (await userModel.find({ email: param}).exec()).pop()
   
    if(email){
     return true
    } else if(email === 'undefined'){
       return false
    }

}



async function hashFinder(param){
    const name = await (await userModel.find({ name: param}).exec()).pop()
    if(name){
        return name.password
    }
   


}



//error checker is used to identify issues

// const errorchecker = async ( )=>{

//     console.log(await hashFinder('karlo2'));
// }

// errorchecker()

  module.exports = {userModel, nameFinder, emailFinder, hashFinder}