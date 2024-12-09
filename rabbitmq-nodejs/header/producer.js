const amqplib = require('amqplib');

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function sendNotification(headers, message) {
    try {
        const connection = await amqplib.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const exchangeName = "header_exchange"

        await channel.assertExchange(exchangeName, "headers", { durable: true });

        channel.publish(exchangeName, "", Buffer.from(message), {
            persistent: true,
            headers
        })

        console.log('notifiation send');

        setTimeout(() => {
            connection.close();
        }, 500);

    }
    catch (err) {
        console.log(err);
    }
}

sendNotification({ "x-match": "all", "notification-type": "new_video", "content-type": "video" }, "new music videoo uploaed")

