const amqplib = require('amqplib');
const { connectionString } = require('../constant');
const { log_Queue_Name } = require('../constant');


const exchangeName = log_Queue_Name;

const reciveLog = async () => {
    const connection = await amqplib.connect(connectionString);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "fanout", { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });

    console.log('waiting for message queue ', q.queue);
    channel.bindQueue(q.queue, exchangeName, "");

    channel.consume(q.queue, (msg) => {
        console.log(msg.content.toString());
    }, { noAck: true })

}


reciveLog();