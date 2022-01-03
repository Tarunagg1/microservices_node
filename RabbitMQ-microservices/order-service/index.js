"use strict";
// order

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

        // consuming data
        channel.consume(queueName, (data) => {
            let condata = JSON.parse(String(Buffer.from(data.content)));
            console.log(condata);
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
    }
}

app.use(express.json());

const PORT = process.env.PORT || 5555;

app.listen(PORT, function () {
    console.log('server listning at ', PORT);
})

