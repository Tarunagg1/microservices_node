const amqplib = require('amqplib');

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}


async function consumeMessage(message) {
    try {
        const connection = await amqplib.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const queueName = "lazy_notifications_queue";

        await channel.assertQueue(queueName, {
            durble: true,
            arguments: {
                'x-queue-mode': "lazy"
            }
        });

        console.log('wating for message exchange');

        channel.consume(queueName, (message) => {
            if (message !== null) {
                console.log("message", message.content.toString());
                channel.ack(message);
            }
        })
    } catch (error) {
        console.log(error);
    }
}


consumeMessage()