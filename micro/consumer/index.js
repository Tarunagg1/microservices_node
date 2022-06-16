const express = require('express');
const mongoose = require('mongoose');
const amqplib = require('amqplib');

const app = express();

app.use(express.json());

const userModel = mongoose.model('user', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
}))

const startUp = async () => {
    try {
        console.log('mongo_uuri', process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI);
        const open = await amqplib.connect(process.env.RABBIT_URI);

        let q = "task";
        const conn = await open;

        open.then(function (conn) {
            console.log('consumer coonnected to rabbitmq: ');
        }).catch((err) => console.warn)

        const ch = await conn.createChannel();
        ch.assertQueue(q).then((ok) => {
            return ch.consume(q, async function (msg) {
                if (msg !== null) {
                    console.log(msg.content.toString());
                    const newuser = new userModel(JSON.parse(msg.content.toString()));
                    await newuser.save();
                    ch.ack(msg);
                }
            })
        })

    } catch (e) {
        console.log(e)
    }
}


setTimeout(() => {
    startUp();
}, 3000);

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
})

app.listen(process.env.PORT, () => {
    console.log('server listning at port ' + process.env.PORT);
})