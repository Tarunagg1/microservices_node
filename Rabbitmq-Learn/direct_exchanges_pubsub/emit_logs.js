const connectToRabbitMq = require('../Connection');

const exchangeName = "logsss";
const args = process.argv.slice(2);

const msg = args[0] || "no error message";
// const logType = args[0] || "no error type";

console.log(msg);
const sendMessage = async () => {
    const channel = await connectToRabbitMq();

    await channel.assertExchange(exchangeName, 'headers', { durable: false });
    channel.publish(exchangeName,'', Buffer.from(msg), { headers: { account: 'new', method: 'google' } });

    setTimeout(() => {
        process.exit(1)
    }, 500);
}



sendMessage();