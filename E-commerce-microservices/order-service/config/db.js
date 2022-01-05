const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/microorder",()=>{
    console.log('connection established');
})




