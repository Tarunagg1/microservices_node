const amqplib = require('amqplib');
const { connectionString } = require('../constant');
const { task_Queue_Name } = require('../constant');

const queneName = task_Queue_Name;


const recivetask = async () => {
    const connection = await amqplib.connect(connectionString);
    const channel = await connection.createChannel(queneName);
    await channel.assertQueue(queneName, { durable: true });
    channel.prefetch(1);

    console.log('waiting for message');
    channel.consume(queneName, (msg) => {
        console.log(msg.content.toString());

        setTimeout(() => {
            channel.ack(msg)
        }, 4000);
    }, { noAck: false })

}


recivetask();