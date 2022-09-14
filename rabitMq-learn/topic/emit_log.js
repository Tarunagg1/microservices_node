const amqp = require('amqplib');

const exchangeName = "topic_logs";

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}


let channel = null;

const args = process.argv.slice(2);

const msg = args[1] || "hello world";
const key = args[0] || "hello world";


const sentToQueue = async (key, data) => {
    try {
        channel.publish(exchangeName, key, Buffer.from(data));
        console.log('send queue complete ', data);
    } catch (error) {
        console.log(error);
    }
}


(async () => {
    connection = await amqp.connect(connecttionSettings);
    console.log('connected to raabitmq');

    channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "topic", { durable: false });

    sentToQueue(key, msg);
})()
