const express = require('express');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb://root:example@mongo:27017/?authSource=admin')
    .then(() => console.log('mongo db connection established'))
    .catch((e) => console.log('mongo db connection failed', e))

app.get('/api/v1', (req, res) => {
    res.send('hello world from tarun aggarwal');
})


const PORT = process.env.PORT || 3000;



app.listen(PORT, function () {
    console.log('listening on port ' + PORT);
})

//  docker run -v %cd%:/app -v /app/node_modules  -p 3000:3000 -d --name node-app node-app-image  

