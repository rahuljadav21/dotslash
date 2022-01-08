const express = require('express');
const router = express.Router();
const Food = require('../models/food');

router.get('/',async(req,res)=>{
    let fooditems = await Food.find({});
    res.send(fooditems);
})

router.post('/',(req,res)=>{
    const food = new Food({
        name : req.body.name,
        quantity :req.body.quantity,
        type : req.body.type,
        calories : req.body.calories
    })
    food.save();
    res.redirect('/food')
})

router.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
   Food.findOneAndDelete(id);
    res.send('item Deleted')
})

module.exports = router;