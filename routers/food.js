const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const User = require('../models/user')

router.get('/plan',async(req,res)=>{
let user = await User.findById(req.session.userId).populate('plan')
let foods = await Food.find({})
res.render('plan.ejs',{foods,user});
})

router.patch('/plan/:id',async(req,res)=>{
    const user = await User.findById(req.session.userId);
    if(!user){
        res.redirect('/user/login');
    }else{
        const {id} = req.params
    
        const food = await Food.findById(id)
        user.plan.push(food);
        
        await User.findByIdAndUpdate(req.session.userId,user);
        res.redirect('/food/plan')
    }    
})
router.patch('/reset/plan/',async(req,res)=>{
    const user = await User.findById(req.session.userId).populate('plan');
    if(!user){
        res.redirect('/user/login');
    }else{
        const {id} = req.params
        user.plan=[];
        
        await User.findByIdAndUpdate(req.session.userId,user);
        res.redirect('/food/plan')
    }    
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