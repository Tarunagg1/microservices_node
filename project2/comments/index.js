const express = require('express');
const { randomBytes } = require('crypto')
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const id = req.params.id;
    return res.send(commentsByPostId[id] || []);
})

app.post('/posts/:id/comments', async (req, res) => {
    const cid = randomBytes(4).toString('hex');
    const { content } = req.body;
    const id = req.params.id;


    let comments = commentsByPostId[id] || [];

    comments.push({ id: cid, content });

    commentsByPostId[id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'commentCreated',
        data: {
            id: cid,
            postid:id,
            content
        }
    });

    return res.status(201).send(comments);
})


app.post('/events', (req,res) => {
    console.log('recived events', req.body.type);
    return res.status(200).json({});
})


const PORT = 4001;

app.listen(PORT, () => {
    console.log('comments server listning at: ', PORT);
})

