const bcrypt = require("bcrypt");
const validator=require('validator')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
//make static signup method
userSchema.statics.signup = async function (email, password) {
//validation using validator
if(!email || !password){
  throw Error ("All fields must be filled.")
}
if(!validator.isEmail(email)){
  throw Error("Email is not valid")
}
if(!validator.isStrongPassword(password)){
  throw Error ("password is not strong enough")
}

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("This email is already exist ");
  }
  //generating salt for extra security of password and hashing password
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);
  //now storing hash password and  the email that the user  enter, in the databases and return the user
  const user = await this.create({ email, password: hash });
  return user;
};
//static login method
userSchema.statics.login=async function(email,password){
  if(!email||!password){
    throw Error("All fields must be filled")
  }
  const user= await this.findOne({email})
  if(!user){
    throw Error("Incorrect email")
  }
  const match= await bcrypt.compare(password,user.password)
  if(!match){
    throw Error("Incorrect Password")
  }
  return user

}




module.exports = mongoose.model("User", userSchema);
