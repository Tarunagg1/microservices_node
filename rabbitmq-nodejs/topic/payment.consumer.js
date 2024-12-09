const amqp = require('amqplib')

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function listenNotification() {
    try {
        const connection = await amqp.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const exchangeName = "notification_exchange"
        const routingKey = "payment_queue";



        await channel.assertExchange(exchangeName, "topic", { durable: true });
        await channel.assertQueue(routingKey, { durable: true });

        const key = "payment.*"

        await channel.bindQueue(routingKey, exchangeName, key);

        console.log('waiting for message');

        channel.consume(routingKey, (msg) => {
            if (msg !== null) {
                console.log('order notification ', JSON.parse(msg.content));
                channel.ack(msg)
            }
        })
    } catch (error) {
        console.log(error);
    }
}


listenNotification()