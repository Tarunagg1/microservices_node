const amqplib = require('amqplib');

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function sendMessages() {
    try {
        const connection = await amqplib.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const exchangeName = "priority_exchange"
        const queueName = "priority_queue"
        const routingKey = "priority_key"

        await channel.assertExchange(exchangeName, "direct", { durable: true });

        await channel.assertQueue(queueName, {
            durable: true,
            arguments: {
                "x-max-priority": 10
            }
        });

        await channel.bindQueue(queueName, exchangeName, routingKey);

        const data = [
            {
                msg: "hello min: 2",
                priority: 2,
            },
            {
                msg: "hello low: 1",
                priority: 1,
            },
            {
                msg: "hello low: 1",
                priority: 2,
            },
        ]

        data.map((data) => {
            channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(data)), { priority: data.priority });
        })

        console.log('messages sent successfully');


        setTimeout(() => {
            connection.close();
        }, 500);

    }
    catch (err) {
        console.log(err);
    }
}


sendMessages()

