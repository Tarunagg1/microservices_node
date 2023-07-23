const amqp = require('amqplib');
const { connectionString, helloQueueName } = require('./constant');




const sendMsg = async () => {
    const data = {
        name: "tarun",
        email: "tarun@gmail.com",
        date: new Date().getMilliseconds()
    }
    const connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel(helloQueueName);
    await channel.assertQueue(helloQueueName, { durable: false });
    channel.sendToQueue(helloQueueName, Buffer.from(JSON.stringify(data)));
    setTimeout(() => {
        connection.close();
    }, 500);

}


setInterval(() => {
    console.log('send again');
    sendMsg();
}, 500);
