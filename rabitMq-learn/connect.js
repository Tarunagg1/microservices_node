const amqp = require('amqplib');


let channel = null;

async function connect(QUEUE_NAME) {
    const RABITMQ_URL = 'amqp://localhost:5672';
    try {
        connection = await amqp.connect(RABITMQ_URL)
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME);
        return channel;
    } catch (error) {
        console.log(error);
    }
}


module.exports = connect;