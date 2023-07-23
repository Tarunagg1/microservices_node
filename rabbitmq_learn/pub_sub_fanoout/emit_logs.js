const amqp = require('amqplib');
const { connectionString } = require('../constant');
const { log_Queue_Name } = require('../constant');

const exchangeName = log_Queue_Name;


const sentLog = async () => {
    const data = {
        name: "tarun",
        email: "tarun@gmail.com",
        date: new Date().getMilliseconds()
    }

    const connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "fanout", { durable: false });

    channel.publish(exchangeName, "", Buffer.from(JSON.stringify(data)));

    setTimeout(() => {
        connection.close();
    }, 500);

}


setInterval(() => {
    console.log('send again');
    sentLog();
}, 500);
