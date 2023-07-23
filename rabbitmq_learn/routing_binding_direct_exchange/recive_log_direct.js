const amqplib = require('amqplib');
const { connectionString, direct_routing_binding_Queue_Name } = require('../constant');

const exchangeName = direct_routing_binding_Queue_Name;

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('usages');
    process.exit(1);
}

const recivetask = async () => {
    const connection = await amqplib.connect(connectionString);
    const channel = await connection.createChannel();
    await channel.assertExchange(exchangeName, "direct", { durable: false });
    const q = await channel.assertQueue('', { exclusive: true });

    console.log('waiting for message queue ', q.queue);

    
    args.forEach(function(name){
        channel.bindQueue(q.queue, exchangeName, name);
    })

    channel.consume(q.queue, (msg) => {
        console.log(msg.content.toString());
    }, { noAck: true })

}


recivetask();