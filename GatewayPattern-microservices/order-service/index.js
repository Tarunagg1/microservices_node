const express = require('express');
const amqp = require('amqplib')
let channel, connection;

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4400;

const orderQueue = "ORDER";
const profileQueue = "PROFILE";
const gatewayQueue = "GATEWAY";

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


connect().then(async () => {
    channel.consume(orderQueue, (data) => {
        console.log(data.content);
        const {name,price,user} = JSON.parse(data.content);
        console.log(user);

        const newOrder = {
            name,price,
            order:"123456"
        }
        if(user){
            newOrder.user = user;
            newOrder.call = "ORDER_WITH_USER";
            channel.sendToQueue(gatewayQueue, Buffer.from(JSON.stringify(newOrder)));   
        }else{
            newData.call = "ORDER_WITH_USER";
            channel.sendToQueue(profileQueue, Buffer.from(JSON.stringify(newData)));
        }
    });
}).catch((err) => {
    console.log(err);
})


app.listen(PORT, function () {
    console.log('server listning at ', PORT);
})

