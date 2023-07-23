const amqp = require('amqplib');
const { connectionString, topic_exchnage } = require('../constant');

const exchangeName = topic_exchnage;

const args = process.argv.slice(2);

const msg = args[1] || "Something went wrong";
const logType = args[0];

const sendLog = async () => {
    const connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "topic", { durable: false });

    channel.publish(exchangeName, logType, Buffer.from(msg));

    setTimeout(() => {
        connection.close();
    }, 500);

}

sendLog();
