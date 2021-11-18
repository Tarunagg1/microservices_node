const e = require('express');
const express = require('express');
const gateway = require('fast-gateway');



const PORT = 9001;

const checkAuth = (req, res, next) => {
    if (req.headers && req.headers.autherization) {
        next();
    } else {
        res.statusCode = 401;
        res.end(JSON.stringify({ status: 401, message: "Authentication failed" }));
    }
}


const server = gateway({
    routes: [
        {
            prefix: '/order',
            target: 'http://localhost:8001',
            hooks: {}
        },  
        {
            prefix: '/payment',
            target: 'http://localhost:8002',
            middlewares: [checkAuth],
            hooks: {}
        }
    ]
});


server.get('mytesting', (req, res) => res.send("gateway working"));

server.start(PORT)
    .then(server => {
        console.log('Api gateway listning at: ', PORT);
    })



