const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  work: {
    type: String,
    enum: ["waiter", "manager", "chef"],
    required: true,
  },

  mobile: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  address: {
    type: String,
  },

  salary: {
    type: Number,
    required: true,
  },

  username:{
    required:true,
    type:String
  },
  password:{
    required:true,
    type:String,

  }

});

// personSchema.pre('save', async function (next) {
//   const person = this;

//   // Agar password change nahi hua hai to aage badh jao
//   if (!person.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(person.password, salt);

//     // plain password ko hashed password se replace karo
//     person.password = hashedPassword;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

personSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


personSchema.methods.comparePassword = async function(candidatePassword){
  try{
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
  }catch(err){
    throw err;
  }

}

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
