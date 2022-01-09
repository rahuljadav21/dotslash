const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Food = require('./food');
const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    quantity:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:['fruit','vegitable','drink','dairy','snack'],
        required:true
    },
    calories:{
        type:Number,
        required:true
    }
})
const userSchema = new mongoose.Schema({
    plan:[{
        type:Schema.Types.ObjectId,
        ref:'Food'
    }],
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