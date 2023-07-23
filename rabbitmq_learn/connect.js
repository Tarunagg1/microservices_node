const amqp = require('amqplib');
let channel = null;

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function connect(QUEUE_NAME) {
    // const RABITMQ_URL = 'amqp://localhost:5672';
    try {
        connection = await amqp.connect(connecttionSettings);
        console.log('connected to raabitmq');

        channel = await connection.createChannel(QUEUE_NAME);
        await channel.assertQueue(QUEUE_NAME,{durable:false});
        return channel;
    } catch (error) {
        console.log(error);
    }
}


module.exports = connect;