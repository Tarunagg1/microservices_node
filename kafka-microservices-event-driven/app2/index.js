const express = require('express');
const kafka = require('kafka-node');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());


const dbAreRunning = async () => {
    mongoose.connect(process.env.MONGO_URL);


    const User = mongoose.model('User', new mongoose.Schema({
        name: String,
        email: String,
        password: String
    }));


    const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS });
    const consumer = new kafka.Consumer(client, [{ topic: process.env.KAFKA_TOPIC }], {
        autoCommit: false
    });

    consumer.on('message', async (message) => {
        console.log(message);
        const newUser = new User(JSON.parse(message.value));
        await newUser.save();
    })

    consumer.on('error', async (err) => {
        console.log(err);
    })
}



setTimeout(dbAreRunning, 10000);

app.listen(process.env.PORT, function () {
    console.log('listening on port ' + process.env.PORT);
})
