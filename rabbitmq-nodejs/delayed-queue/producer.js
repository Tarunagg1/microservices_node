const amqp = require('amqplib')

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

function processOrder(orders) {
    return orders;
}

async function sendToDelayedQueue(batchId, orders, delay) {
    const connection = await amqp.connect(connecttionSettings);
    const channel = await connection.createChannel();

    const exchangeName = "delayed_exchange";

    await channel.assertExchange(exchangeName, 'x-delayed-message', {
        arguments: {
            'x-delayed-type': "direct"
        }
    });

    const queue = "delayed_order_updates_queue"

    channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchangeName, "");

    const message = JSON.stringify({ batchId, orders });

    channel.publish(exchangeName, "", Buffer.from(message), {
        headers: { "x-delay": delay }
    });

    console.log('processed batch send to queue');


    setTimeout(() => {
        channel.close();
        connection.close();
    }, 500);

}

async function processbatchOrders() {
    const batchId = genratebatchId();
    const orders = collectOrdersForBatch();

    console.log(`processing orders ${batchId}`);

    await processOrder(orders);

    const delay = 10000;
    sendToDelayedQueue(batchId, orders, delay);
}


function collectOrdersForBatch() {
    return [
        { orderId: 1, item: "laptop", quantity: 1 },
        { orderId: 2, item: "phone", quantity: 2 },
    ]
}

function genratebatchId() {
    return `batch-${Date.now()}`;
}

processbatchOrders()