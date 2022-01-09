const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds =  10;
const Food =require('../models/food')
const router = express.Router();

router.get('/',async(req,res)=>{
const user = await User.findById(req.session.userId);
if(!user){
    res.redirect('/user/login')
}
res.render('dashboard.ejs',{user})
})
router.get('/signup',(req,res)=>{
    res.render('signup.ejs')
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
        user.bodyFat= 1.2*user.bmi+0.23*user.age-16.2;
        user.idealWeight = 50+ 0.9*(h-152);
    }
    if(user.gender=='Female'){
        user.calories = 10*w + 6.25*h -5*a -161;
        user.bodyFat= 1.2*user.bmi+0.23*user.age-5.4;
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
    res.render('login.ejs')
})
router.post('/login',async(req,res)=>{
    const user = await User.findOne({email : req.body.email});
    if(!user){
     res.send("Email or Password is Incorrect")
    }else{
     const isAutherised = bcrypt.compareSync(req.body.password, user.password);
     if(isAutherised){
         req.session.userId = user._id
        res.redirect('/user')
       }else{
          res.send("Email or Password is Incorrect") 
       }
    }
   
 })

router.get('/edit',async(req,res)=>{
    const user = await User.findById(req.session.userId);
    if(!user){
        res.redirect('/user/login')
    }
    res.render('update.ejs',{user})
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
        user.bodyFat= 1.2*user.bmi+0.23*user.age-16.2;
        user.idealWeight = 50+ 0.9*(h-152);
    }
    if(user.gender=='Female'){
        user.calories = 10*w + 6.25*h -5*a -161;
        user.bodyFat= 1.2*user.bmi+0.23*user.age-5.4;
        user.idealWeight = 45.5+ 0.9*(h-152);
    }
    user.plan = [];
    await user.save();
    res.redirect('/user')

})
 router.get('/logout',async(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})

module.exports = router;