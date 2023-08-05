const amqplib = require('amqplib');
const { connectionString, rpc_queue } = require('../constant');

const fibonacci = (num) => {
    if (num == 0 || num == 1)
        return num;
    else
        return fibonacci(num - 1) + fibonacci(num - 2);
}

const reciveMsg = async () => {
    const connection = await amqplib.connect(connectionString);
    const channel = await connection.createChannel();
    const q = await channel.assertQueue(rpc_queue, { exclusive: true });
    channel.prefetch(1);

    console.log('waiting for message queue ', q.queue);

    channel.consume(rpc_queue, (msg) => {
        const n = parseInt(msg.content.toString());
        const fibNum = fibonacci(n);

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(fibNum.toString()), {
            correlationId: msg.properties.correlationId
        });
        channel.ack(msg);
    }, { noAck: false })

}


reciveMsg();