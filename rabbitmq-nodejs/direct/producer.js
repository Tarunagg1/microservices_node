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

        const exchangeName = "mail_exchange"
        const routingKey = "send_mail"
        const queueName = "mail_queue"

        const message = {
            to: "tarun@gmail.com",
            subject: "Hello",
            body: "body"
        }

        await channel.assertExchange(exchangeName, "direct", { durble: false });

        await channel.assertQueue(queueName, { durble: false });

        await channel.bindQueue(queueName, exchangeName, routingKey);

        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)));

        console.log('mail send');

        setTimeout(() => {
            connection.close();
        }, 500);


    } catch (error) {
        console.log(error);
    }
}

sendMail();
