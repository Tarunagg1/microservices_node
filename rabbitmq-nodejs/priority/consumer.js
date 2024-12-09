const amqplib = require('amqplib');

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function reciveMessages() {
    try {
        const connection = await amqplib.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const queueName = "priority_queue"

        // await channel.assertExchange(exchangeName, "direct", { durable: true });

        await channel.assertQueue(queueName, {
            durable: true,
            arguments: {
                "x-max-priority": 10
            }
        });

        console.log('wating for message queue');


        channel.consume(queueName, (message) => {
            if (message !== null) {
                console.log("recived: ", JSON.parse(message.content));
                channel.ack(message);
            }
        })
    }
    catch (err) {
        console.log(err);
    }
}


reciveMessages()

