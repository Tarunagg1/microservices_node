const amqp = require('amqplib');

const QUEUE_NAME = "logs";

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}


let channel = null;

const msg = process.argv.slice(2).join(' ') || "hello world";

const sentToQueue = async (data) => {
    try {
        channel.publish(QUEUE_NAME, "", Buffer.from(data), { durable: true });
        console.log('send queue complete ', data);
    } catch (error) {
        console.log(error);
    }
}


(async () => {
    connection = await amqp.connect(connecttionSettings);
    console.log('connected to raabitmq');

    channel = await connection.createChannel();
    await channel.assertExchange(QUEUE_NAME, "fanout", { durable: false });

    sentToQueue(msg);
})()
