const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors('*'));

app.get('/', (req, res) => {
    return res.json({
        message: "Welcome to the appi"
    })
})

app.listen(3000, '0.0.0.0', () => {
    console.log('server listen on port 3000');
})
