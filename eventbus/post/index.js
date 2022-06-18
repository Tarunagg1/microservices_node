const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    return res.send(posts);
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'postCreated',
        data: {
            id, title
        }
    });

    return res.status(201).send(posts[id]);

})


app.post('/events', (req,res) => {
    console.log('recived events', req.body.type);
    return res.status(200).json({});
})


const PORT = 4000;

app.listen(PORT, () => {
    console.log('post server listning at: ', PORT);
})



