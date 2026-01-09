
const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const { jwtAuthMiddleware, generateToken } = require('../jwt');



// POST route a add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save(); 
    console.log("data saved");

    const payload = {
      id: response.id,
      username:response.username,
    }

    const token = generateToken({ payload:payload});

  
    res.status(201).json({response:response,token:token}); 

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });



  }
});


// 
router.post('/login',async (req,res)=>{

  try{
    const {username,password} = req.body;

    const user = await Person.findOne({username:username});

    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({err:"Invalid username or password"});

    }

    const payload = {
      id : user.id,
      username:user.username
    }

    const token =generateToken(payload);
     res.status(200).json({ token });

  }catch(err){
    console.error(err);
    res.status(500).json({err:"Internal server error"});

  }

})


// profile route

router.get('/profile',jwtAuthMiddleware, async (req,res)=>{
  try{
    const userdata = req.user;
    const userId= userdata.id;

    const user = await Person.findById(userId);

    res.status(200).json({user});

  }catch(err){

    res.status(500).json({err:'Internal server error'});

  }
});

// get route  to  person details
router.get('/', jwtAuthMiddleware,async (req,res)=>{
  try{
    const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);

  }catch(err){
    
    res.status(500).json({err:'Internal server Error'});
  }
});


// get route to work person
router.get('/:workType',async(req,res)=>{

  try{
    const workType = req.params.workType;
    if(workType =='chef' || workType =='manager' || workType =='waiter'){

    const response = await Person.find({work:workType});
    console.log('response fetched');
    res.status(200).json(response);

   }else{
    res.status(404).json({error:'Invalid work type'});

   }

  }catch(err){
    console.log(err);
    res.status(500).json({err:'Internal server Error'});

  }
   
});


router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            unvalidators:true,
        });

        if(!response){
            return res.status(404).json({err:"user not found"});
        }

        console.log("data is updated");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal Server error'})

    }
})


router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndRemove(PersonId);

        if(!response){
            return res.status(404).json({err:"user not found"});
        }
        console.log("data is delete");
        res.status(200).json({message:"person deleted Succesfully"})


    }catch{
        console.log(err);
        res.status(500).json({err:'Internal Server error'})


    }
})
module.exports = router;