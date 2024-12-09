const amqp = require('amqplib')

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

function updateOrderStatuses(batchId) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('order statuss update to statting');
            resolve();
        }, 1000);
    })
}


async function sendToDelayedQueue() {
    const connection = await amqp.connect(connecttionSettings);
    const channel = await connection.createChannel();

    const queue = "delayed_order_updates_queue"

    channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (batch) => {
        if (batch !== null) {
            const { batchId } = JSON.parse(batch.content.toString());
            console.log("processing orders");

            await updateOrderStatuses(batchId)
            channel.ack(batch);
        }
    }, { noAck: false });


}

sendToDelayedQueue()