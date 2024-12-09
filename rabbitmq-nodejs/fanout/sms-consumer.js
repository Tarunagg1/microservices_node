const amqplib = require('amqplib');

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function sendSms() {
    try {
        const connection = await amqplib.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const exchangeName = "new_product_launch"

        await channel.assertExchange(exchangeName, "fanout", { durable: true });

        const q = await channel.assertQueue("", { exclusive: true })
        console.log('wating for message');

        await channel.bindQueue(q.queue, exchangeName, "")


        channel.consume(q.queue, (message) => {
            if (message !== null) {
                console.log("sms message", JSON.parse(message.content));
                channel.ack(message);
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}

sendSms()

