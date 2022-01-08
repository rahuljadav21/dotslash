const mongoose = require('mongoose')
const foodSchema = require('./food');
const planSchema = new mongoose.Schema({
    foodList:{
        type:[foodSchema],
    },
    user:{
        type:"String",
        required:true
    },
    calories :{
        type:"Number",
        required:true
    }
})
module.exports = mongoose.model('Plan',planSchema);
