const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:['Female','Male'],
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    calories:{
        type:Number
    },
    bmi:{
        type:Number
    },
    neck:{
        type:Number
    },
    waist:{
        type:Number
    },
    bodyFat:{
        type:Number
    },
    idealWeight:{
        type:Number
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('User',userSchema);