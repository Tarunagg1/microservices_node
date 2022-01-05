"use strict"

const express = require('express');
require('./config/db');
const amqp = require('amqplib');
let channel, connection;
const orderModel = require('./models/order');
const isAuthenticated = require('../isAuthenticated');
const { orderQueue, productQueue } = require('../queueName');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 7072;

const createOrder = async(products, userEmail) => {
    let total = 0;
    for (let index = 0; index < products.length; index++) {
        total += products[index].price;
    }
    const newOrder = new orderModel({ products: products, user: userEmail, total_price: total });
    await newOrder.save();
    return newOrder;
}

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    try {
        connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel();
        await channel.assertQueue(orderQueue);
    } catch (error) {
        console.log(error);
    }
}

connect().then(() => {
    channel.consume(orderQueue,async data => {
        const { products, userEmail } = JSON.parse(data.content);
        const newOrder = await createOrder(products, userEmail);
        channel.ack(data);
        channel.sendToQueue(productQueue, Buffer.from(JSON.stringify(newOrder)));
    });
}).catch((error) => {
    console.log(error);
})




app.listen(PORT, () => {
    console.log('Server listning at ', PORT);
});


