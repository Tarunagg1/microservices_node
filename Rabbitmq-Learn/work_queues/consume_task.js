const connectToRabbitMq = require('../Connection');

const queueName = "task";


const reciveMessage = async () => {
    const channel = await connectToRabbitMq();
    channel.assertQueue(queueName, { durable: true });
    channel.prefetch(1);
    channel.consume(queueName, msg => {
        const secs = msg.content.toString().split(".").length - 1;
        console.log('Recived ', msg.content.toString());
        setTimeout(() => {
            console.log('done resizing image');
            channel.ack(msg);
        }, secs * 1000);
    }, { noAck: false });
}

reciveMessage();
