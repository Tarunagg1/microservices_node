const express = require('express');
const amqp = require('amqplib')
let channel, connection;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4500;

const profileQueue = "PROFILE";
const orderQueue = "ORDER";
const gatewayQueue = "GATEWAY";


async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue(profileQueue);
    } catch (error) {
        console.log(error);
    }
}

const fakeUser = {
    name: "tarun",
    number: 12345678
}

connect().then(() => {
    channel.consume(profileQueue, (data) => {
        channel.ack(data);
        const newdata = JSON.parse(data.content);
        if (newdata.call === "ORDER_WITH_USER") {
            data.user = fakeUser;
            channel.sendToQueue(orderQueue, Buffer.from(JSON.stringify(data)))
        } else {
            channel.sendToQueue(gatewayQueue, Buffer.from(JSON.stringify(fakeUser)));
        }
    });
}).catch((err) => {
    console.log(err);
})

app.listen(PORT, function () {
    console.log('server listning at ', PORT);
})

