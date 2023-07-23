const amqp = require('amqplib');
const { connectionString } = require('../constant');
const { task_Queue_Name } = require('../constant');

const queneName = task_Queue_Name;


const sendTask = async () => {
    const data = {
        name: "tarun",
        email: "tarun@gmail.com",
        confirmtextt: queneName,
        date: new Date().getMilliseconds()
    }
    
    const connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel(queneName);
    await channel.assertQueue(queneName, { durable: true });

    channel.sendToQueue(queneName, Buffer.from(JSON.stringify(data)), { persistent: true });
    setTimeout(() => {
        connection.close();
    }, 500);

}


// setInterval(() => {
//     console.log('send again');
// }, 500);
sendTask();
