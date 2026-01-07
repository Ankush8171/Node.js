const express = require('express')
const router = express.Router();
const menu= require('../models/menu');


router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newmenu = new menu(data);
    const response = await newmenu.save(); 
    console.log("data saved");
    res.status(201).json(response); 
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get('/',async(req,res)=>{
    try{
        const data = await menu.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({
            err:err.message
        });
    }
})





module.exports = router;