const express = require('express');


const app = express();

app.get('/', (req, res) => {
    res.send('hello world from tarun');
})


const PORT = process.env.PORT || 3000;



app.listen(PORT, function(){
    console.log('listening on port ' + PORT);
})

//  docker run -v %cd%:/app -v /app/node_modules  -p 3000:3000 -d --name node-app node-app-image  

