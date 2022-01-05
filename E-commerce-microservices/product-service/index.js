"use strict"

const express = require('express');
require('./config/db');
const amqp = require('amqplib');
let channel, connection;
const productModel = require('./models/product');
const isAuthenticated = require('../isAuthenticated');
const { productQueue, orderQueue } = require('../queueName');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 7071;

connect()
async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer)
        channel = await connection.createChannel();
        await channel.assertQueue(productQueue);
    } catch (error) {
        console.log(error);
    }
}

app.post('/product/create', isAuthenticated, async (req, res) => {
    const { name, desc, price } = req.body;
    try {
        const newProduct = new productModel({
            name, desc, price
        })
        const resp = await newProduct.save();
        return res.status(200).json({ message: "product added successful", resp })
    } catch (error) {
        return res.status(400).json({ message: "COmething went wrong", error: error })
    }

})

// user sends a list  of id's to but products
// creating an order with those products and a total value of sum of products prices

app.post('/product/buy', isAuthenticated, async (req, res) => {
    const { ids } = req.body;
    let order;
    try {
        const products = await productModel.find({ _id: { $in: ids } });
        await channel.sendToQueue(orderQueue, Buffer.from(JSON.stringify({ products, userEmail: req.user.email })));

        channel.consume(productQueue, data => {
            order = JSON.parse(data.content);
            channel.ack(data);
            return res.status(200).json({ message: "product added successful", order })
        });
    } catch (error) {
        return res.status(400).json({ message: "COmething went wrong", error: error })
    }

})



app.listen(PORT, () => {
    console.log('Server listning at ', PORT);
});


