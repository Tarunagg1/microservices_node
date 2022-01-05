const express = require('express');
const amqp = require('amqplib')
let channel, connection;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4300;

const orderQueue = "ORDER";
const profileQueue = "PROFILE";
const gatewayQueue = "GATEWAY";


connect();
async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue(orderQueue);
    } catch (error) {
        console.log(error);
    }
}


const fakeOrder = {
    name: "ORDER",
    price: 100
}

async function consumeGateWayQueue(cb) {
    console.log('me');
    channel.consume(gatewayQueue, (msg) => {
        console.log('mesg');
        channel.ack(msg);
        const data = JSON.parse(msg.content);
        if (data.call === "ORDER_WITH_USER") {
            delete data.call;
            cb(data)
        } else {
            cb(data);
        }
    })
}

app.get('/', async (req, res) => {
    let order, fakeuser;
    const { call } = req.query;
    if (call === 'ORDER') {
        channel.sendToQueue(orderQueue, Buffer.from(JSON.stringify(fakeOrder)));
        consumeGateWayQueue(function (data) {
            order = data;
        });
        return res.status(200).json(order);
    } else if (call === 'PROFILE') {
        console.log('hete');
        channel.sendToQueue(profileQueue, Buffer.from(JSON.stringify({ call: "USER_PROFILE" })));
        consumeGateWayQueue(function (data) {
            fakeuser = data;
        });
        return res.status(200).json(fakeuser);
    }
});


app.listen(PORT, function () {
    console.log('server listning at ', PORT);
})

