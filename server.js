const express = require("express");
const app = express();
require('dotenv').config();


const connectDB = require("./db"); 
connectDB(); 

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Passport = require('./Auth');


// middleware fucntion
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} request made to : ${req.originalUrl}`);
  next();
};

app.use(logRequest);


app.use(Passport.initialize());
const localAuthMiddleware = Passport.authenticate('local',{session:false});

// test route
app.get("/",(req,res) => {
  res.send("welcome to my hotel.........");
});


// import the router files
const personRoutes = require('./routes/personRoutes')
//use the routes
app.use('/person',personRoutes);

const menuRoutes = require('./routes/MenuRoutes')
//use the routes
app.use('/menu',menuRoutes);


const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log("chal rha hu bhai ");
});
