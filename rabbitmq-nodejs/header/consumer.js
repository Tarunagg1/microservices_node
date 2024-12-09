const amqplib = require('amqplib');

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function consumerNewVideoUpplaod() {
    try {
        const connection = await amqplib.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const exchangeName = "header_exchange"

        await channel.assertExchange(exchangeName, "headers", { durable: true });
        const q = await channel.assertQueue("", { exclusive: true });
        console.log('wating for message');


        channel.bindQueue(q.queue, exchangeName, "", {
            "x-match": "all",
            "notification-type": "new_video",
            "content-type": "video"
        })

        channel.consume(q.queue, (message) => {
            if (message !== null) {
                console.log("message", message.content.toString());
                channel.ack(message);
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}

consumerNewVideoUpplaod()

