const connectToRabbitMq = require('../Connection');

const exchangeName = "logss";
const args = process.argv.slice(2);

const msg = args[1] || "no error message";
const logType = args[0] || "no error type";


const sendMessage = async () => {
    const channel = await connectToRabbitMq();
    await channel.assertExchange(exchangeName, 'topic', { durable: false });

    channel.publish(exchangeName, logType, Buffer.from(msg));
    setTimeout(() => {
        process.exit(1)
    }, 500);
}



sendMessage();