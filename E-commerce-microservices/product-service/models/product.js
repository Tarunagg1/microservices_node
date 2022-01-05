const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    created_at:{
        type:Date,
        default:Date.now()
    }
})


module.exports = Product = mongoose.model('product',productSchema)



