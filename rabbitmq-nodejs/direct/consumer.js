const amqplib = require('amqplib');

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function reviveMail() {
    try {
        const connection = await amqplib.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const queueName = "mail_queue"

        await channel.assertQueue(queueName);

        channel.consume(queueName, (message) => {
            if (message !== null) {
                console.log("message", JSON.parse(message.content));
                channel.ack(message);
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}

reviveMail()

