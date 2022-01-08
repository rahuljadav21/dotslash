const mongoose = require('mongoose')
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


module.exports = mongoose.model('Food',foodSchema);
