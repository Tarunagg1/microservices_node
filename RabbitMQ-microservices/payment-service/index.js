"use strict";
// payment

const express = require('express');
const amqp = require('amqplib')
let channel, connection;


let queueName = 'rabbit';
const app = express();


connect();
async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel();
        await channel.assertQueue(queueName);
    } catch (error) {
        console.log(error);
    }
}

app.use(express.json());

const PORT = process.env.PORT || 4444;

app.get("/send", async function (req, res) {
    let fakeData = {
        name: "tarun",
        company: "spacex"
    }
    try {
        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(fakeData)));
        await channel.close();
        await connection.close();
        return res.status(200).json({ message: "SUCCESS" })
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, function () {
    console.log('server listning at ', PORT);
})

