const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds =  10;
const router = express.Router();

router.get('/',async(req,res)=>{

})
router.get('/signup',(req,res)=>{
    res.send('Sign Up')
})

router.post('/signup',async(req,res)=>{
    
    const user = new User({
        username : req.body.username,
        email : req.body.email,
        age:req.body.age,
        gender:req.body.gender,
        weight:req.body.weight,
        height:req.body.height,
        neck:req.body.neck,
        waist:req.body.waist,
    })
    
    let w =user.weight;
    let h =user.height;
    let a =user.age;
    let wst = user.waist
    let n = user.neck
    user.bmi = w*10000/(h*h);

    if(user.gender=='Male'){
        user.calories = 10*w + 6.25*h -5*a +5;
        user.bodyFat= 495/(1.0324-0.19077*Math.log10(wst-n) +0.15456*Math.log10(h)) - 450;
        user.idealWeight = 50+ 0.9*(h-152);
    }
    if(user.gender=='Female'){
        user.calories = 10*w + 6.25*h -5*a -161;
        user.bodyFat= 495/(1.29579-0.35004*Math.log10(wst-n) +0.22100*Math.log10(h)) - 450;
        user.idealWeight = 45.5+ 0.9*(h-152);
    }
    
    const pw = req.body.password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pw,salt);
    user.password = hash
    await user.save()
    req.session.userId = user._id
    res.redirect('/')
})
router.get('/login',(req,res)=>{
    res.send('login')
})
router.post('/login',async(req,res)=>{
    const user = await User.findOne({email : req.body.email});
    if(!user){
     res.send("Email or Password is Incorrect")
    }else{
     const isAutherised = bcrypt.compareSync(req.body.password, user.password);
     if(isAutherised){
         req.session.userId = user._id
         res.send(user)
       }else{
          res.send("Email or Password is Incorrect") 
       }
    }
   
 })
router.patch('/edit/:id',async(req,res)=>{
    const {id} = req.params;
    const user = await User.findOneAndUpdate(id,{
        username : req.body.username,
        email : req.body.email,
        age:req.body.age,
        gender:req.body.gender,
        weight:req.body.weight,
        height:req.body.height,
        neck:req.body.neck,
        waist:req.body.waist,
    });
    let w =user.weight;
    let h =user.height;
    let a =user.age;
    let wst = user.waist
    let n = user.neck
    user.bmi = w*10000/(h*h);

    if(user.gender=='Male'){
        user.calories = 10*w + 6.25*h -5*a +5;
        user.bodyFat= 495/(1.0324-0.19077*Math.log10(wst-n) +0.15456*Math.log10(h)) - 450;
        user.idealWeight = 50+ 0.9*(h-152);
    }
    if(user.gender=='Female'){
        user.calories = 10*w + 6.25*h -5*a -161;
        user.bodyFat= 495/(1.29579-0.35004*Math.log10(wst-n) +0.22100*Math.log10(h)) - 450;
        user.idealWeight = 45.5+ 0.9*(h-152);
    }
    await user.save();
    res.send('edited succesfully')

})
 router.post('/logout',async(req,res)=>{
    req.session.destroy()
    res.send('logged out')
})

module.exports = router;