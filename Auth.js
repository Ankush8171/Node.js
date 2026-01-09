
const Person = require("./models/person");
const menu = require("./models/menu");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//authentication logic here
passport.use(new LocalStrategy(async (username,password,done)=>{

  try{
    //console.log('Received credentials',username,password)
    const user = await Person.findOne({username:username});

    if(!user){
      return done(null,false,{message:'Incorrect username'});
    }

    const isPasswordMatch = await user.comparepassword(password) ;
    if(isPasswordMatch){
      return done(null,user);
    }else{
      return done(null,false,{message:'Incorrect password'});
    }

  }catch(err){
    return done(err);
  }
}))



module.exports = passport;

