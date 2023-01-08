const connectToRabbitMq = require('../Connection');

const exchangeName = "logss";

const args = process.argv.slice(2);

const logType = args[0];

const reciveMessage = async () => {
    const channel = await connectToRabbitMq();

    await channel.assertExchange(exchangeName, 'topic', { durable: false });
    const q = await channel.assertQueue('', { exclusive: true });

    console.log('waiting for message in queuue', q.queue);
    args.map((e) => {
        channel.bindQueue(q.queue, exchangeName, e);
    });

    channel.consume(q.queue, msg => {
        if (msg.content) {
            console.log('Recived ', msg.content.toString());
        }
    }, { noAck: true });
}

reciveMessage();
