
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    return res.send(posts);
})


app.post('/events', (req,res) => {
    console.log('recived events', req.body.type);
    const {type,data} = req.body;

    if(type === 'postCreated'){
        const {id,title} = data;
        posts[id] = {id,title,comments:[]};
        
    }else if(type === 'commentCreated'){
        const {id,postid,content} = data;

        const post = posts[postid];
        post.comments.push({id,content});
    }

    return res.status(200).json({});
})


const PORT = 4002;

app.listen(PORT, () => {
    console.log('query server listning at: ', PORT);
})



