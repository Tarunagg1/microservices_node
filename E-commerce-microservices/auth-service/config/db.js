const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/microauth",()=>{
    console.log('connection established');
})




