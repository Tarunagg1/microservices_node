const amqp = require('amqplib');
const exchangeName = "topic_logs";


let channel = null;

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}

const args = process.argv.slice(2);

// const msg = args[1] || "hello world";
// const key = args[0] || "hello world";



const reciverMessage = async () => {
    connection = await amqp.connect(connecttionSettings);
    channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "topic", { durable: false });

    const q = await channel.assertQueue('', { exclusive: true });

    console.log('waiting for message in queue ', q.queue);
    args.forEach((key)=>{
        console.log(key);
        channel.bindQueue(q.queue, exchangeName,key);
    })

    channel.consume(q.queue, (msg) => {
        if (msg.content) {
            console.log('received message ', msg.content.toString());
        }
    })
}

reciverMessage();