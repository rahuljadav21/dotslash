const mongoose = require('mongoose')
const foodSchema = require('./food');
const planSchema = new mongoose.Schema({
    breakFast:{
        type:[foodSchema],
    },
    lunch:{
        type:[foodSchema]
    },
    dinner:{
        type:[foodSchema]
    },
    other:{
        type:[foodSchema]
    }
})
module.exports = mongoose.model('Plan',planSchema);
