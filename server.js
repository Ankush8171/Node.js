const express = require("express");
const app = express();
require('dotenv').config();

const connectDB = require("./db"); 
connectDB(); 

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// const Person = require("./models/person");
//const menu = require("./models/menu");

// test route
app.get("/", (req, res) => {
  res.send("welcome to my hotel.........");
});

// create person
// app.post("/person", async (req, res) => {
//   try {
//     const data = req.body;

//     const newPerson = new Person(data);
//     const response = await newPerson.save(); 
//     console.log("data saved");
//     res.status(201).json(response); 
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });


//  create person list
// app.get('/person',async (req,res)=>{
//   try{
//     const data = await Person.find();
//     console.log('data fetched');
//     res.status(200).json(data);

//   }catch(err){
//     console.log(err);
//     res.status(500).json({err:'Internal server Error'});
//   }
// });




// app.post("/menu", async (req, res) => {
//   try {
//     const data = req.body;
//     const newmenu = new menu(data);
//     const response = await newmenu.save(); 
//     console.log("data saved");
//     res.status(201).json(response); 
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });

// app.get('/menu',async(req,res)=>{
//     try{
//         const data = await menu.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({
//             err:err.message
//         });
//     }
// })


// app.get('/work/:workType',async(req,res)=>{

//   try{
//     const workType = req.params.workType;
//    if(workType =='chef' || workType =='manager' || workType =='waiter'){

//     const response = await Person.find({work:workType});
//     console.log('response fetched');
//     res.status(200).json(response);

//    }else{
//     res.status(404).json({error:'Invalid work type'});

//    }

//   }catch(err){
//     console.log(err);
//     res.status(500).json({err:'Internal server Error'});

//   }
   
// })


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
