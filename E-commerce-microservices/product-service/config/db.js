const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/microproduct",()=>{
    console.log('connection established');
})




