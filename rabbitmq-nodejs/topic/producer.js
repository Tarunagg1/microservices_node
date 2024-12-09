const amqp = require('amqplib')

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function sendNotofication(routingKey, message) {
    try {
        const connection = await amqp.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const exchangeName = "notification_exchange"

        await channel.assertExchange(exchangeName, "topic", { durable: true });

        // const subscribeMessage = {
        //     to: "tarun@gmail.com",
        //     subject: "Hello",
        //     body: "body",
        //     isSubscribe: true
        // }

        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)), { persistent: true });

        console.log(`Message send ${routingKey}, ${JSON.stringify(message)}`);


        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.log(error);
    }
}


sendNotofication("order.processed", { orderId: 1945, status: 'placed' })
sendNotofication("payment.processed", { paymentId: 1945, status: 'processed' })


