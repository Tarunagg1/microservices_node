const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    created_at:{
        type:Date,
        default:Date.now()
    }
})


module.exports = User = mongoose.model('user',userSchema)



