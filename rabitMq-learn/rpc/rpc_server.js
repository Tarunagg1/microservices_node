const amqp = require('amqplib');

const QUEUE_NAME = "rpc_queue";

let channel = null;

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

const processTask = async () => {
    connection = await amqp.connect(connecttionSettings);
    channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: false });

    channel.prefetch(1);
    console.log('Awatting for rpc request...');

    channel.consume(QUEUE_NAME, (msg) => {
        const n = parseInt(msg.content.toString());

        // const fibbNum = fibonacci(n);
        const fibbNum = n * n;
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(fibbNum.toString()), {
            correlationId: msg.properties.correlationId
        });
        channel.ack(msg);
    }, { noAck: false })
}

processTask();