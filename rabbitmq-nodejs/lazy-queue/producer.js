const amqplib = require('amqplib');

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}


async function setup(message) {
    console.log('sent');

    try {
        const connection = await amqplib.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const exchangeName = "notification_echange";
        const queueName = "lazy_notifications_queue";
        const routingKey = "notification.key";

        await channel.assertExchange(exchangeName, "direct", { durble: true });

        await channel.assertQueue(queueName, {
            durble: false,
            arguments: {
                'x-queue-mode': "lazy"
            }
        });

        await channel.bindQueue(queueName, exchangeName, routingKey);
        channel.publish(exchangeName, routingKey, Buffer.from(message));

        console.log('message sent');

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.log(error);
    }
}

setup("hii i'm message")

// for (let index = 0; index < 10000000000; index++) {
//     setup("hii i'm message")
// }