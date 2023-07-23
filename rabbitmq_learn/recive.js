const amqplib = require('amqplib');
const { connectionString, helloQueueName } = require('./constant');


const reciveMsg = async () => {
    const connection = await amqplib.connect(connectionString);
    const channel = await connection.createChannel(helloQueueName);
    await channel.assertQueue(helloQueueName, { durable: false });

    console.log('waiting for message');
    channel.consume(helloQueueName, (msg) => {
        console.log(msg.content.toString());
    }, { noAck: true })

}


reciveMsg();