const connectToRabbitMq = require('../Connection');

const exchangeName = "logsss";

const args = process.argv.slice(2);

const logType = args[0];

const reciveMessage = async () => {
    const channel = await connectToRabbitMq();

    await channel.assertExchange(exchangeName, 'headers', { durable: false });
    const q = await channel.assertQueue('', { exclusive: true });

    console.log('waiting for message in queuue', q.queue);

    channel.bindQueue(q.queue, exchangeName, '', { 'account': 'new', 'method': 'facebook', 'x-match': 'any' });

    channel.consume(q.queue, msg => {
        if (msg.content) {
            console.log('Recived ', msg.content.toString());
        }
    }, { noAck: true });
}

reciveMessage();
