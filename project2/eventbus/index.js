const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());


app.post('/events', (req, res) => {
    const event = req.body;
    axios.post('http://localhost:4000/events', event);
    axios.post('http://localhost:4001/events', event);
    axios.post('http://localhost:4002/events', event);
    return res.status(200).send({ status: 'OK' });
})


const PORT = 4005;

app.listen(PORT, () => {
    console.log('event bus server listning at: ', PORT);
})



