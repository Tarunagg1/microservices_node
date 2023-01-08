const connectToRabbitMq = require('../Connection');

const exchangeName = "logs";
const msg = process.argv.slice(2).join(" ") || "dummy text";


const sendMessage = async () => {
    const channel = await connectToRabbitMq();
    await channel.assertExchange(exchangeName, 'fanout', { durable: false });

    channel.publish(exchangeName, '', Buffer.from(msg));
    setTimeout(() => {
        process.exit(1)
    }, 500);
}



sendMessage();