const connectToRabbitMq = require('../Connection');

const queueName = "task";
const msg = process.argv.slice(2).join(" ") || "dummy text";


const sendMessage = async () => {
    const channel = await connectToRabbitMq();
    channel.assertQueue(queueName, {durable: true});
    channel.sendToQueue(queueName,Buffer.from(msg));
    setTimeout(() => {
        process.exit(1)
    }, 500);
}



sendMessage();