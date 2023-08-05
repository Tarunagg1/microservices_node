const amqp = require('amqplib');
const { connectionString, rpc_queue } = require('../constant');
const { v4: uuidvv4 } = require('uuid');


const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('pass number');
    process.exit(1);
}

const uuid = uuidvv4();
const num = parseInt(args[0]);

const getFib = async () => {
    const connection = await amqp.connect(connectionString);
    const channel = await connection.createChannel();
    const q = await channel.assertQueue('', { exclusive: true });

    console.log('requesting for fib', num);

    channel.sendToQueue(rpc_queue, Buffer.from(num.toString()), {
        replyTo: q.queue,
        correlationId: uuid
    });

    console.log('send: ', num);

    channel.consume(q.queue, (msg) => {
        if (msg.properties.correlationId === uuid) {
            console.log("recive: ", msg.content.toString());
        }
    }, { noAck: true });

}



getFib();

