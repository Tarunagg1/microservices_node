const amqplib = require('amqplib');

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

async function newLaunch(product) {
    try {
        const connection = await amqplib.connect(connecttionSettings);
        const channel = await connection.createChannel();

        const exchangeName = "new_product_launch"

        await channel.assertExchange(exchangeName, "fanout", { durble: true });

        channel.publish(exchangeName, "", Buffer.from(JSON.stringify(product)), { persistent: true });

        console.log('product send');

        setTimeout(() => {
            connection.close();
        }, 500);


    } catch (error) {
        console.log(error);
    }
}

newLaunch({
    productId: 26555,
    productName: "o9i"
});
