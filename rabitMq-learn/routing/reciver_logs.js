const amqp = require('amqplib');

const QUEUE_NAME = "logs";

let channel = null;

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}


const reciverMessage = async () => {
    connection = await amqp.connect(connecttionSettings);
    channel = await connection.createChannel();
    await channel.assertExchange(QUEUE_NAME, "fanout", { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });
    console.log('waiting for message in queue ', q.queue);
    channel.bindQueue(q.queue, QUEUE_NAME, '');

    channel.consume(q.queue, (msg) => {
        if (msg.content) {
            console.log('received message ', msg.content.toString());
        }
    })
}

reciverMessage();