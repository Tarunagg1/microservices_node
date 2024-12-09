const amqplib = require('amqplib');

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function sendMail() {
    try {
        const connection = await amqplib.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const exchangeName = "mail_exchange1"
        const routingKey = "send_mail"
        const routingKeySubscribed = "subscribed_send_mail"


        const message = {
            to: "tarun@gmail.com",
            subject: "Hello",
            body: "body",
            isSubscribe: false
        }

        const subscribeMessage = {
            to: "tarun@gmail.com",
            subject: "Hello",
            body: "body",
            isSubscribe: true
        }

        await channel.assertExchange(exchangeName, "direct", { durable: false })

        await channel.assertQueue(routingKey, exchangeName, { durable: false })
        await channel.assertQueue(routingKeySubscribed, exchangeName, { durable: false })

        await channel.bindQueue(routingKey, exchangeName, routingKey);
        await channel.bindQueue(routingKeySubscribed, exchangeName, routingKeySubscribed);

        // channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
        channel.publish(exchangeName, routingKeySubscribed, Buffer.from(JSON.stringify(subscribeMessage)));

        console.log('mail send');

        setTimeout(() => {
            connection.close();
        }, 500);
    }
    catch (error) {
        console.log(error);
    }
}

sendMail()