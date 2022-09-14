const amqp = require('amqplib');
const { v4: uuidvv4 } = require('uuid');

const QUEUE_NAME = "rpc_queue";
const uuid = uuidvv4();

const connecttionSettings = {
    protocol: 'amqp',
    host: 'localhost',
    port: 5672,
    vhost: '/'
}


let channel = null;

const args = process.argv.slice(2);


if (args.length == 0) {
    console.log('usage rpc_client.js number required');
    process.exit(1);
}

const num = parseInt(args[0])

const getFib = async () => {
    let connection = await amqp.connect(connecttionSettings);
    console.log('connected to raabitmq');

    channel = await connection.createChannel();
    const q = await channel.assertQueue('', { exclusive: true });

    console.log('requesting to fibb: ', num);

    channel.sendToQueue(QUEUE_NAME, Buffer.from(num.toString()), {
        replyTo: q.queue,
        correlationId: uuid
    });

    channel.consume(q.queue, msg => {
        console.log('recived');
        if (msg.properties.correlationId == uuid) {
            console.log('Got fibb number is', msg.content.toString());
            setTimeout(() => {
                connection.close();
                process.exit(0);
            }, 500);
        }
    }, { noAck: false });
}

getFib();