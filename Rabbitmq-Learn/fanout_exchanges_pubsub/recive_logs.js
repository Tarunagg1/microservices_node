const connectToRabbitMq = require('../Connection');

const exchangeName = "logs";


const reciveMessage = async () => {
    const channel = await connectToRabbitMq();

    await channel.assertExchange(exchangeName, 'fanout', { durable: false });
    const q = await channel.assertQueue('', { exclusive: true });
    console.log('waiting for message in queuue', q.queue);
    channel.bindQueue(q.queue, exchangeName, '');

    channel.consume(q.queue, msg => {
        if (msg.content) {
            console.log('Recived ', msg.content.toString());
        }
    }, { noAck: true });
}

reciveMessage();
