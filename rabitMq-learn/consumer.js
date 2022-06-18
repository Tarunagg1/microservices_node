const amqp = require('amqplib');



let channel = null;

const QUEUE_NAME = "jobs";




const data = {
    name: process.argv[2],
    email: "tarun@gmail.com",
    date: new Date().getMilliseconds()
}


async function connect() {
    const RABITMQ_URL = 'amqp://localhost:5672';
    try {
        connection = await amqp.connect(RABITMQ_URL)
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME);
    } catch (error) {
        console.log(error);
    }
}

(async () => {
    await connect()
    channel.consume(QUEUE_NAME, (msg) => {
        console.log('received message ', msg.content.toString());
        channel.ack(msg);
    })
})()
