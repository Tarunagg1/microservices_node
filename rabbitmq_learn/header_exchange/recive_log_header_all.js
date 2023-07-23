const amqplib = require('amqplib');
const { connectionString, header_exchnage } = require('../constant');

const exchangeName = header_exchnage;

const args = process.argv.slice(2);

const recivetask = async () => {
    const connection = await amqplib.connect(connectionString);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "headers", { durable: false });
    const q = await channel.assertQueue('', { exclusive: true });

    console.log('waiting for message queue ', q.queue);


    channel.bindQueue(q.queue, exchangeName, "", { "account": "new", "method": "google", "x-match": "all" });

    channel.consume(q.queue, (msg) => {
        console.log(msg.content.toString());
    }, { noAck: true })

}


recivetask();