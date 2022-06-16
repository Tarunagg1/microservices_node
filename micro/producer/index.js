const express = require('express');
const amqplib = require('amqplib');
const { Sequelize } = require('sequelize');


const app = express();
app.use(express.json());

let open;
let q = "task";

const startUp = async () => {
    try {
        const sequelize = new Sequelize(process.env.PG_URI);
        sequelize.authenticate()
            .then(() => {
                console.log('connection established to postgres');
            })
            .catch(console.warn)

        open = await amqplib.connect(process.env.RABBIT_URI);

        // const conn = await open;

        open.then(function (conn) {
            console.log('consumer coonnected to rabbitmq: ');
        }).catch((err) => console.warn)

        // const ch = await conn.createChannel();
        // ch.assertQueue(q).then((ok) => {
        //     return ch.consume(q, function (msg) {
        //         if (msg !== null) {
        //             console.log(msg.content.toString());
        //             ch.ack(msg);
        //         }
        //     })
        // })

    } catch (e) {
        console.log(e)
    }
}

setTimeout(() => {
    startUp();
}, 3000);

const sentToQueue = async (msg, res) => {
    try {
        const conn = await open;
        const ch = await conn.createChannel();
        await ch.assertQueue(q);
        const result = await ch.sendToQueue(q, Buffer.from(JSON.stringify(msg)));

        console.log(result);

        return res.json({ result });

    }
    catch (e) {
        console.log(e);
    }
}



app.post('/', async (req, res) => {
    await sentToQueue(req.body, res)
})

app.listen(process.env.PORT, () => {
    console.log('server listning at port ' + process.env.PORT);
})