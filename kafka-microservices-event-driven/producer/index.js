const express = require('express');
const kafka = require('kafka-node');
const { Sequelize, DataTypes } = require('sequelize');


const app = express();
app.use(express.json());

const dbAreRunning = async () => {

    const db = new Sequelize(process.env.POSTGRES_URl);

    const User = db.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });


    db.sync({ force: true });

    const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS });
    const producer = new kafka.Producer(client);

    producer.on('ready', () => {
        console.log('Producer is ready');
        app.post('/', async function (req, res) {
            producer.send([{ topic: process.env.KAFKA_TOPIC, message: JSON.stringify(req.body) }], async (err, data) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                    await User.create(req.body);
                    res.send(req.body);
                }
            })
        })

    })
}


setTimeout(dbAreRunning, 10000);

app.listen(process.env.PORT, function () {
    console.log('listening on port ' + process.env.PORT);
})
